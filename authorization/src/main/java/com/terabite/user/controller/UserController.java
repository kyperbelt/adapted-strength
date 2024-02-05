package com.terabite.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.user.model.UserInformation;

@RestController
@RequestMapping("/v1/user")
public class UserController {

        private AuthorizationApi authorizationApi;
        // README: Accounts are created by the authorization service and not by the user
        // service.
        // This service will only be repsonsible for creating, updating, and deleting
        // and retrieving user information.
        @PostMapping("/create-account-information")
        public ResponseEntity<String> createAccountInformation(
                        @RequestHeader("Authorization") final String token,
                        @RequestBody final UserInformation userInformation) {


                return ResponseEntity.ok("Account information created successfully");
        }

}
