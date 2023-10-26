package com.terabite.authorization;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {

    @GetMapping("/signup")
    public Payload userSignup() {
        return new Payload("Reached signup");
    }

    @PostMapping("/signup")
    public Payload userSignupPost() {
        return new Payload("Reached signup POST");
    }

    @GetMapping("/login")
    public Payload userLogin() {
        return new Payload("Reached login");
    }

    @PostMapping("/login")
    public Payload userLoginPost() {
        return new Payload("Reached login POST");
    }

    @GetMapping("/logout")
    public Payload userLogoutGet() {
        return new Payload("Reached logout");
    }

    @PostMapping("/logout")
    public Payload userLogout() {
        return new Payload("Reached logout POST");
    }
}
