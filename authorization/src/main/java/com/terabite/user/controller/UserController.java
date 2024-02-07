package com.terabite.user.controller;

import java.util.Arrays;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.AuthorizationApi;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/user")
public class UserController {

        private final UserRepository userRepository;
        private final AuthorizationApi authorizationApi;

        private final String authCookieName;
        private final String domainUrl;

        private static final Logger log = LoggerFactory.getLogger(UserController.class);

        public UserController(
                        UserRepository userRepository, AuthorizationApi authorizationApi,
                        @Qualifier(GlobalConfiguration.BEAN_NAME_AUTH_COOKIE_NAME) String authCookieName,
                        @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_URL) String domainUrl) {

                this.authorizationApi = authorizationApi;
                this.authCookieName = authCookieName;
                this.domainUrl = domainUrl;
                this.userRepository = userRepository;
        }

        // TODO| README: Accounts are created by the authorization service and not by the user
        // service.
        // This service will only be repsonsible for creating, updating, and deleting
        // and retrieving user information.
        @PostMapping("/create")
        public ResponseEntity<String> createAccountInformation(
                        @RequestBody final UserInformation userInformation,
                        HttpServletRequest request) {

                final Optional<Cookie> token = Arrays.stream(request.getCookies())
                                .filter(cookie -> authCookieName.equals(cookie.getName())).findFirst();
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

        @PutMapping("/update")
        public ResponseEntity<String> updateAccountInformation(@RequestBody final UpdateInformationRequestBody updateInformationRequestBody, HttpServletRequest request) {

                final Optional<Cookie> token = Arrays.stream(request.getCookies())
                                .filter(cookie -> authCookieName.equals(cookie.getName())).findFirst();
                if (token.isEmpty()) {
                        log.error("No token found in request");
                        return ResponseEntity.status(401).body("Unauthorized");
                }

                final Optional<String> email = authorizationApi.getEmailFromToken(token.get().getValue());
                if (email.isEmpty()) {
                        log.error("No email found in token");
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
                }

                final Optional<UserInformation> userInformation = userRepository.findByEmail(email.get());

                if (userInformation.isEmpty()) {
                        log.error("No user information found for email: " + email.get());
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User information not found");
                }
                
                final UserInformation userInformationToUpdate = userInformation.get();
                userInformationToUpdate.setFirstName(updateInformationRequestBody.getFirstName());
                userInformationToUpdate.setLastName(updateInformationRequestBody.getLastName());
                userInformationToUpdate.setDateOfBirth(updateInformationRequestBody.getDateOfBirth());
                userInformationToUpdate.setShirtSize(updateInformationRequestBody.getShirtSize());
                userInformationToUpdate.setCellPhone(updateInformationRequestBody.getCellPhone());
                userInformationToUpdate.setHomePhone(updateInformationRequestBody.getHomePhone());
                userInformationToUpdate.getAddress().setAddress(updateInformationRequestBody.getAddress());
                userInformationToUpdate.getAddress().setCity(updateInformationRequestBody.getCity());
                userInformationToUpdate.getAddress().setState(updateInformationRequestBody.getState());
                userInformationToUpdate.getAddress().setZipcode(updateInformationRequestBody.getZipcode());

                userRepository.save(userInformationToUpdate);

                log.info("Account information updated successfully");

                return ResponseEntity.ok("Account information updated successfully");
        }

        @GetMapping("/profile")
        public ResponseEntity<UserInformation> getProfile(HttpServletRequest request) {

                final Optional<Cookie> token = Arrays.stream(request.getCookies())
                                .filter(cookie -> authCookieName.equals(cookie.getName())).findFirst();
                if (token.isEmpty()) {
                        log.error("No token found in request");
                        return ResponseEntity.status(401).body(null);
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

}
