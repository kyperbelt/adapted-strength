package com.terabite.user.controller;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.AuthorizationApi.Roles;
import com.terabite.authorization.config.RoleConfiguration;
import com.terabite.authorization.dto.Payload;
import com.terabite.authorization.dto.RedirectResponse;
import com.terabite.user.model.SubscribeRequest;
import com.terabite.user.model.UnsubscribeRequest;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import com.terabite.user.service.UnsubscribeService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/user")
public class UserController {
    private static final RoleConfiguration AUTHORIZED_USER_CONFIG = RoleConfiguration.builder()
            .all(Roles.ROLE_ACCOUNT_SETUP, Roles.ROLE_TERMS_ACCEPTED).any(Roles.ROLE_USER, Roles.ROLE_ADMIN)
            .except(Roles.ROLE_BANNED).build();

    private final UserRepository userRepository;
    private final SubscriptionService subscriptionService;
    private final UnsubscribeService unsubscribeService;
    private final AuthorizationApi authorizationApi;

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
    }

    // TODO| README: Accounts are created by the authorization service and not by
    // the user
    // service.
    // This service will only be responsible for creating, updating, and deleting
    // and retrieving user information.
    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> createAccountInformation(
            @RequestBody final UserInformation userInformation,
            HttpServletRequest request,
            HttpServletResponse response) {

        final Optional<Cookie> token = getTokenCookie(request);

        if (token.isEmpty()) {
            log.error("No token found in request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Payload.of("Unauthorized"));
        }

        final Optional<String> email = authorizationApi.getEmailFromToken(token.get().getValue());
        if (email.isEmpty()) {
            log.error("No email found in token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Payload.of("Unauthorized"));
        }

        final Optional<UserInformation> userInformationOption = userRepository.findByEmail(email.get());

        if (userInformationOption.isPresent()) {
            log.error("User information already exists for email: " + email.get());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Payload.of("User information already exists"));
        }

        userInformation.setEmail(email.get());

        userRepository.save(userInformation);
        authorizationApi.addRoleToUserFromToken(token.get().getValue(), Roles.ROLE_ACCOUNT_SETUP);

        final Optional<String> refreshedToken = authorizationApi.refreshToken(token.get().getValue());
        if (refreshedToken.isEmpty()) {
            // something seriously wrong happend lol
            log.error("For some resason the token was unable to be refreshed");
        }

        // FIXME: This is a temporary fix and we should use the cookieMonster Service to
        // create these cookie// and only once it is moved out of the authorization
        // service
        Cookie cookie = createAuthorizationCookie(refreshedToken.get(), 60 * 60 * 24 * 7, authCookieName, "localhost");
        response.addCookie(cookie);

        return ResponseEntity.status(HttpStatus.CREATED).body(Payload.of("User information created successfully"));
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
    public ResponseEntity<?> getProfile(HttpServletRequest request, HttpServletResponse response) {

        final Optional<Cookie> token = getTokenCookie(request);

        if (token.isEmpty()) {
            log.error("No token found in request");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Payload("Unauthorized"));
        }

        final Optional<String> email = authorizationApi.getEmailFromToken(token.get().getValue());
        if (email.isEmpty()) {
            log.error("No email found in token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Payload.of("Unauthorized"));
        }

        final List<String> roles = authorizationApi.getRolesFromToken(token.get().getValue());
        if (!AUTHORIZED_USER_CONFIG.validateStringListOfRoles(roles)) {
            log.error("User is not authorized to access this resource");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(AUTHORIZED_USER_CONFIG.getMissingRoles(roles));
        }

        final Optional<UserInformation> userInformation = userRepository.findByEmail(email.get());
        if (userInformation.isEmpty()) {
            log.error("No user information found for email: " + email.get());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.EMPTY_PAYLOAD);
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

    private static void redirectHandler(HttpServletResponse response, String redirectUrl) {
        response.setHeader("Location", redirectUrl);
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        response.setStatus(302);
    }

    private static Cookie createAuthorizationCookie(String value, int life, String name, String url) {
        Cookie newCookie = new Cookie(name, value);
        newCookie.setPath("/");
        newCookie.setMaxAge(life);
        newCookie.setDomain(url);
        return newCookie;
    }
}
