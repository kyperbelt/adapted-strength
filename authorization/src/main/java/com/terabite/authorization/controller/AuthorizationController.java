package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    @PostMapping("/signup")
    public ResponseEntity<String> userSignupPost()
    {
        return new ResponseEntity<>("Reached signup POST", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public Payload userLoginPost() {
        return new Payload("Reached login POST");
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }
}
