package com.terabite.user.controller;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.dto.Payload;
import com.terabite.user.model.SubscribeRequest;
import com.terabite.user.model.UnsubscribeRequest;
import com.terabite.user.model.UserInformation;
import com.terabite.user.model.UserProgramming;
import com.terabite.user.repository.UserProgrammingRepository;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import com.terabite.user.service.UserProgrammingService;

import com.terabite.user.service.UnsubscribeService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/user")
public class UserController {

    private final UserRepository userRepository;
    private final SubscriptionService subscriptionService;
    private final UnsubscribeService unsubscribeService;
    private final AuthorizationApi authorizationApi;
    private final UserProgrammingService userProgrammingService;

    private final String authCookieName;

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(
            SubscriptionService subscriptionService,
            UserRepository userRepository, UnsubscribeService unsubscribeService, AuthorizationApi authorizationApi,
            @Qualifier(GlobalConfiguration.BEAN_NAME_AUTH_COOKIE_NAME) String authCookieName) {

        this.subscriptionService = subscriptionService;
        this.unsubscribeService = unsubscribeService;
        this.authorizationApi = authorizationApi;
        this.authCookieName = authCookieName;
        this.userRepository = userRepository;
        this.userProgrammingService = userProgrammingService;
    }

    // TODO| README: Accounts are created by the authorization service and not by
    // the user
    // service.
    // This service will only be responsible for creating, updating, and deleting
    // and retrieving user information.
    @PostMapping("/create")
    public ResponseEntity<String> createAccountInformation(
            @RequestBody final UserInformation userInformation,
            HttpServletRequest request) {

        final Optional<Cookie> token = getTokenCookie(request);

        if (token.isEmpty()) {
            log.error("No token found in request");
            return ResponseEntity.status(401).body("Unauthorized");
        }

        final Optional<String> email = authorizationApi.getEmailFromToken(token.get().getValue());
        if (email.isEmpty()) {
            log.error("No email found in token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        final Optional<UserInformation> userInformationOption = userRepository.findByEmail(email.get());

        if (userInformationOption.isPresent()) {
            log.error("User information already exists for email: " + email.get());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to create acctount");
        }

        userInformation.setEmail(email.get());

        userRepository.save(userInformation);

        return ResponseEntity.ok("Account information created successfully");
    }

    @PutMapping("/profile")
    public ResponseEntity<Payload> updateAccountInformation(
            @RequestBody final UpdateInformationRequestBody updateInformationRequestBody,
            HttpServletRequest request) {

        final Optional<Cookie> token = getTokenCookie(request);
        if (token.isEmpty()) {

            log.error("No token found in request");
            return ResponseEntity.status(401).body(new Payload("Unauthorized"));
        }

        final Optional<String> email = authorizationApi.getEmailFromToken(token.get().getValue());
        if (email.isEmpty()) {
            log.error("No email found in token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Payload("Unauthorized"));
        }

        final Optional<UserInformation> userInformation = userRepository.findByEmail(email.get());

        if (userInformation.isEmpty()) {
            log.error("No user information found for email: " + email.get());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new Payload("User information not found"));
        }

        final UserInformation userInformationToUpdate = userInformation.get();
        userInformationToUpdate.setFirstName(updateInformationRequestBody.getFirstName());
        userInformationToUpdate.setLastName(updateInformationRequestBody.getLastName());
        // userInformationToUpdate.setDateOfBirth(updateInformationRequestBody.getDateOfBirth());
        // userInformationToUpdate.setShirtSize(updateInformationRequestBody.getShirtSize());
        userInformationToUpdate.setCellPhone(updateInformationRequestBody.getCellPhone());
        // userInformationToUpdate.setHomePhone(updateInformationRequestBody.getHomePhone());
        userInformationToUpdate.getAddress().setAddress(updateInformationRequestBody.getAddress());
        userInformationToUpdate.getAddress().setCity(updateInformationRequestBody.getCity());
        userInformationToUpdate.getAddress().setState(updateInformationRequestBody.getState());
        userInformationToUpdate.getAddress().setZipcode(updateInformationRequestBody.getZipcode());

        userRepository.save(userInformationToUpdate);

        log.info("Account information updated successfully");

        return ResponseEntity.ok(new Payload("Account information updated successfully"));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserInformation> getProfile(HttpServletRequest request) {

        final Optional<Cookie> token = getTokenCookie(request);

        if (token.isEmpty()) {
            log.error("No token found in request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        final Optional<String> email = authorizationApi.getEmailFromToken(token.get().getValue());
        if (email.isEmpty()) {
            log.error("No email found in token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        final Optional<UserInformation> userInformation = userRepository.findByEmail(email.get());
        if (userInformation.isEmpty()) {
            log.error("No user information found for email: " + email.get());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok(userInformation.get());
    }

    private Optional<Cookie> getTokenCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return Optional.empty();
        }
        return Arrays.stream(request.getCookies()).filter(cookie -> authCookieName.equals(cookie.getName()))
                .findFirst();
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> userSubscribePost(@RequestBody SubscribeRequest request,
                                               HttpServletRequest httpRequest) {
        Optional<Cookie> token = getTokenCookie(httpRequest);
        if (token.isEmpty()) {
            log.error("No token found in request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Payload("Unauthorized"));
        }

        return subscriptionService.subscribe(request);
    }

    @GetMapping("/programming")
    public ResponseEntity<?> getUserProgramming(HttpServletRequest request) {
        
        // Auth check
        final Optional<Cookie> token = getTokenCookie(request);
        if(token.isEmpty())
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        final Optional<String> email = authorizationApi.getEmailFromToken(token.get().getValue());
        if(token.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        return userProgrammingService.getUserPrograms(email.get() );
    }

    @PostMapping("/programming/{id}/comment")
    public ResponseEntity<?> addComment(@RequestParam("id") long userProgrammingId, HttpServletRequest request){
        return new ResponseEntity<>("Endpoint to add comment", HttpStatus.NOT_IMPLEMENTED);
    } 

    @PutMapping("/programming/{pid}/comment/{cid}")
    public ResponseEntity<?> updateComment(@RequestParam("pid") long userProgrammingId, @RequestParam("cid") long commentId, HttpServletRequest request){
        return new ResponseEntity<>("Endpoint to edit / update comment", HttpStatus.NOT_IMPLEMENTED);
    }
    @PostMapping("/unsubscribe")
    public ResponseEntity<?> userUnsubscribePost(@RequestBody UnsubscribeRequest request,
                                               HttpServletRequest httpRequest) {
        Optional<Cookie> token = getTokenCookie(httpRequest);
        if (token.isEmpty()) {
            log.error("No token found in request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Payload("Unauthorized"));
        }

        return unsubscribeService.unsubscribe(request);
    }
}