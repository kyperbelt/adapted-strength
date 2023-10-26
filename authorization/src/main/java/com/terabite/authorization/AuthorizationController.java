package com.terabite.authorization;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {


    @PostMapping("/signup")
    public Payload userSignupPost() {
        return new Payload("Reached signup POST");
    }

    @PostMapping("/login")
    public Payload userLoginPost() {
        return new Payload("Reached login POST");
    }

    @PostMapping("/logout")
    public Payload userLogout() {
        return new Payload("Reached logout POST");
    }
}
