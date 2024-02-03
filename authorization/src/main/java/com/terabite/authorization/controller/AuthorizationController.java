package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.SubscribeRequest;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.service.ForgotPasswordHelper;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;
import com.terabite.authorization.service.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {

    private final LoginService loginService;
    private final SignupService signupService;
    private final ForgotPasswordHelper forgotPasswordHelper;

    private final SubscriptionService subscriptionService;

    public AuthorizationController(ForgotPasswordHelper forgotPasswordHelper, LoginService loginService, SignupService signupService, SubscriptionService subscriptionService) {
        this.forgotPasswordHelper = forgotPasswordHelper;
        this.loginService = loginService;
        this.signupService = signupService;
        this.subscriptionService = subscriptionService;
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

    @PostMapping("/subscribe")
    public ResponseEntity<?> userSubscribePost(@RequestBody SubscribeRequest request) {
        return subscriptionService.subscribe(request);
    }

    @PutMapping("/forgot_password")
    public ResponseEntity<String> forgotPassword(@RequestBody String jsonEmail) {
        return forgotPasswordHelper.processForgotPassword(jsonEmail);
    }

    @PutMapping("/reset_password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String jsonPassword) throws LoginNotFoundException {
        return forgotPasswordHelper.processResetPassword(token, jsonPassword);
    }
}
