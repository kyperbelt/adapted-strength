package com.terabite.user.controller;

import java.util.Optional;
import java.util.Set;
import com.stripe.exception.StripeException;
import com.terabite.GlobalConfiguration;
import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.service.JwtService;
import com.terabite.chat.ChatApi;
import com.terabite.payment.model.Customer;
import com.terabite.payment.service.CustomerService;
import com.terabite.user.model.HealthQuestionare;
import com.terabite.user.model.SubscribeRequest;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.HealthQuestionareService;
import com.terabite.user.service.SubscriptionService;
// import com.terabite.user.service.UserProgrammingService;

import com.terabite.user.service.UnsubscribeService;
import com.terabite.user.service.UserProgrammingService;

import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.common.RoleConfiguration;
import com.terabite.common.Roles;
import com.terabite.common.dto.Payload;
import com.terabite.common.model.LoginDetails;
import com.terabite.user.dto.UpdateInformationRequestBody;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;

@RestController
@RequestMapping("/v1/user")
public class UserController {
    private static final RoleConfiguration AUTHORIZED_USER_CONFIG = RoleConfiguration.builder()
            .all(Roles.ROLE_ACCOUNT_SETUP, Roles.ROLE_TERMS_ACCEPTED).any(Roles.ROLE_USER, Roles.ROLE_ADMIN)
            .except(Roles.ROLE_BANNED).build();

    private final UserRepository userRepository;
    private final ChatApi chatApi;
    private final SubscriptionService subscriptionService;
    private final UnsubscribeService unsubscribeService;
    private final HealthQuestionareService healthQuestionareService;

    private final AuthorizationApi authorizationApi;
    private final UserProgrammingService userProgrammingService;
    private final CustomerService customerService;

    private final String authCookieName;
    private final JwtService jwtService;

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(
            ChatApi chatApi,
            UserProgrammingService userProgrammingService,
            SubscriptionService subscriptionService,
            HealthQuestionareService healthQuestionareService,
            UserRepository userRepository, UnsubscribeService unsubscribeService, AuthorizationApi authorizationApi,
            CustomerService customerService,
            @Qualifier(GlobalConfiguration.BEAN_NAME_AUTH_COOKIE_NAME) String authCookieName, JwtService jwtService) {

        this.chatApi = chatApi;
        this.subscriptionService = subscriptionService;
        this.healthQuestionareService = healthQuestionareService;
        this.unsubscribeService = unsubscribeService;
        this.authorizationApi = authorizationApi;
        this.authCookieName = authCookieName;
        this.userRepository = userRepository;
        this.userProgrammingService = userProgrammingService;
        this.jwtService = jwtService;
        this.customerService = customerService;
    }

    @GetMapping("/get/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COACH')")
    public ResponseEntity<?> getUserInformation(@PathVariable("email") String email) {
        Optional<UserInformation> userInformation = userRepository.findByEmail(email);

        if (userInformation.isEmpty()) {
            log.error("UserInformation for " + email + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("User not found"));
        }

        return ResponseEntity.ok(userInformation);
    }

    @GetMapping("/get")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COACH')")
    public ResponseEntity<?> getAllUserInformation() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/delete/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUserInformation(@PathVariable("email") String email) {
        Optional<UserInformation> userInformation = userRepository.findByEmail(email);

        if (userInformation.isEmpty()) {
            log.error("UserInformation for " + email + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("User not found"));
        }

        userRepository.delete(userInformation.get());
        return ResponseEntity.ok(Payload.of("User deleted successfully"));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAccountInformation(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserInformation userInformation) {
        Optional<UserInformation> existingUser = userRepository.findByEmail(userDetails.getUsername());

        if (existingUser.isPresent()) {
            log.error("UserInformation for " + userInformation.getEmail() + " already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userInformation);
        }

        // Create stripe customer with user email
        Customer customer;
        try {
            customer = customerService.createNewCustomer(userInformation);
            userInformation.setCustomer(customer);
        } catch (StripeException e) {
            e.printStackTrace();
        }

        userRepository.save(userInformation);
        chatApi.createUser(userInformation.getEmail(), userInformation.getFirstName() + " " + userInformation.getLastName(),
                "USER");
        return ResponseEntity.ok(Payload.of("Account information created successfully"));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateAccountInformation(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateInformationRequestBody updateInformationRequestBody) {
        Optional<UserInformation> existingUser = userRepository.findByEmail(userDetails.getUsername());
        // User must already exist to update it
        if (existingUser.isEmpty()) {
            log.error("UserInformation for " + userDetails.getUsername() + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("User not found"));
        }

        // Update all fields
        UserInformation toUpdate = existingUser.get();
        toUpdate.setFirstName(updateInformationRequestBody.getFirstName());
        toUpdate.setLastName(updateInformationRequestBody.getLastName());
        toUpdate.setCellPhone(updateInformationRequestBody.getCellPhone());
        toUpdate.getAddress().setAddress(updateInformationRequestBody.getAddress());
        toUpdate.getAddress().setCity(updateInformationRequestBody.getCity());
        toUpdate.getAddress().setState(updateInformationRequestBody.getState());
        toUpdate.getAddress().setZipcode(updateInformationRequestBody.getZipcode());

        userRepository.save(toUpdate);
        return ResponseEntity.ok(toUpdate);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<UserInformation> existingUser = userRepository.findByEmail(userDetails.getUsername());

        if (existingUser.isEmpty()) {
            log.error("UserInformation for {} not found", userDetails.getUsername());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("User not found"));
        }

        return ResponseEntity.ok(existingUser);
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> userSubscribePost(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody SubscribeRequest subscribeRequest) {
        final LoginDetails loginDetails = (LoginDetails) userDetails;

        final String email = loginDetails.getUsername();

        log.info("User {} is subscribing with request {}", email, subscribeRequest);
        return subscriptionService.subscribe(subscribeRequest, email);
    }

    @GetMapping("/programming")
    public ResponseEntity<?> getUserProgramming(@AuthenticationPrincipal UserDetails userdetails) {
        if (userdetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Payload.of("Unauthorized"));
        }
        return userProgrammingService.getUserPrograms(userdetails.getUsername());
    }

    @GetMapping("/programming/user/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COACH')")
    public ResponseEntity<?> getUserProgramming(@PathVariable("email") String email) {
        return userProgrammingService.getUserPrograms(email);
    }

    @PostMapping("/programming")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COACH')")
    public ResponseEntity<?> addProgramming(@RequestParam("email") String email,
            @RequestParam("programId") long programId, @RequestParam("startWeek") int startWeek, @RequestParam("startDate") Long startDate) {
        return userProgrammingService.addProgramming(email, programId, startWeek, startDate);
    }

    @DeleteMapping("/programming/{upid}/remove")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COACH')")
    public ResponseEntity<?> removeProgramming(@PathVariable("upid") long userProgrammingId) {
        return userProgrammingService.removeProgramming(userProgrammingId);
    }

    @PostMapping("/programming/{upid}/comment")
    public ResponseEntity<?> addComment(@PathVariable("upid") long userProgrammingId,
            @RequestParam("comment") String comment, @AuthenticationPrincipal UserDetails userDetails) {
        // return new ResponseEntity<>("Endpoint to add comment",
        // HttpStatus.NOT_IMPLEMENTED);

        return userProgrammingService.addComment(userProgrammingId, comment);
    }

    @PutMapping("/programming/comment/{cid}")
    public ResponseEntity<?> updateComment(@PathVariable("cid") long commentId,
            @RequestParam("comment") String comment) {
        // return new ResponseEntity<>("Endpoint to edit / update comment",
        // HttpStatus.NOT_IMPLEMENTED);
        return userProgrammingService.updateComment(commentId, comment);
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<?> userUnsubscribePost(@AuthenticationPrincipal UserDetails userDetails) {
        final String email = userDetails.getUsername();

        return unsubscribeService.unsubscribe(email);
    }

    @PostMapping("/validate_user_data")
    public ResponseEntity<?> validateUserData(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper mapper = new ObjectMapper();
        ResponseEntity<?> badRequest = ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Payload.of("Invalid user information"));

        try {
            final UserInformation userInformation = mapper.readValue(request.getInputStream(), UserInformation.class);

            if (!validateUserInfo(userInformation)) {
                log.error("User information is invalid");
                return badRequest;
            }

        } catch (Exception e) {
            log.error("Unable to parse user information", e.getMessage());
            return badRequest;
        }

        return ResponseEntity.ok(Payload.of("User information is valid"));

    }

    @GetMapping("/health_questionare/{email}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COACH')")
    public ResponseEntity<?> getHealthQuestionare(@PathVariable("email") String email) {
        return healthQuestionareService.getHealthQuestionareByEmail(email);
    }

    @PostMapping("/health_questionare")
    public ResponseEntity<?> createHealthQuestionare(@RequestBody HealthQuestionare healthQuestionare) {
        return healthQuestionareService.createHealthQuestionare(healthQuestionare);
    }

    @GetMapping("/health_questionare")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_COACH')")
    public ResponseEntity<?> getAllHealthQuestionares() {
        return ResponseEntity.ok(healthQuestionareService.getAllHealthQuestionares());
    }

    private static boolean validateUserInfo(UserInformation userInfo) {
        Set<ConstraintViolation<UserInformation>> violations = Validation.buildDefaultValidatorFactory().getValidator()
                .validate(userInfo);
        if (violations.isEmpty()) {
            return true;
        }
        return false;
    }
}
