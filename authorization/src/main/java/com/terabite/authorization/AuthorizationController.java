package com.terabite.authorization;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorizationController {

    @GetMapping("/user/signup")
    public Payload userSignup() {
        return new Payload("Reached signup");
    }

    @PostMapping("/user/signup")
    public Payload userSignupPost() {
        return new Payload("Reached signup POST");
    }

    @GetMapping("/user/login")
    public Payload userLogin() {
        return new Payload("Reached login");
    }

    @PostMapping("/user/login")
    public Payload userLoginPost() {
        return new Payload("Reached login POST");
    }

    @GetMapping("/user/logout")
    public Payload userLogoutGet() {
        return new Payload("Reached logout");
    }

    @PostMapping("/user/logout")
    public Payload userLogout() {
        return new Payload("Reached logout POST");
    }
}
