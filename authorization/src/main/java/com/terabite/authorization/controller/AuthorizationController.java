package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    private final LoginService loginService;
    private final SignupService signupService;


    public AuthorizationController(LoginService loginService, SignupService signupService) {
        this.loginService = loginService;
        this.signupService = signupService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> userSignupPost(@RequestBody UserInformation userInformation) {
        return signupService.signup(userInformation);
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login) {
        return loginService.login(login);
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }
}
