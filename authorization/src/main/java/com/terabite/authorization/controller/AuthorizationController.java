package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import com.terabite.authorization.internal.Handler;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.service.ForgotPasswordHelper;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {

    private final LoginService loginService;
    private final SignupService signupService;
    private final ForgotPasswordHelper forgotPasswordHelper;
    private final Handler<Void, ResponseEntity<?>> hander;

    public AuthorizationController(ForgotPasswordHelper forgotPasswordHelper, LoginService loginService, SignupService signupService, Handler<Void, ResponseEntity<?>> hander) {
        this.forgotPasswordHelper = forgotPasswordHelper;
        this.loginService = loginService;
        this.signupService = signupService;
        this.hander = hander;
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
    public ResponseEntity<?> userLogoutPost() {
        return hander.invoke(null).join();
        // return new Payload("Reached logout POST");
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
