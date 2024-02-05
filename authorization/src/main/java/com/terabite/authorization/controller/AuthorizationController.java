package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.service.ForgotPasswordHelper;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SignupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
public class AuthorizationController {

    private final LoginService loginService;
    private final SignupService signupService;
    private final ForgotPasswordHelper forgotPasswordHelper;

    public AuthorizationController(ForgotPasswordHelper forgotPasswordHelper, LoginService loginService,
            SignupService signupService) {
        this.forgotPasswordHelper = forgotPasswordHelper;
        this.loginService = loginService;
        this.signupService = signupService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> userSignupPost(@RequestBody Login login) {
        // TODO:
        // lets have this return a session token (JWT) and then use this token to
        // temporarily authenticate the user
        // as if they had logged in. See signupService.signup for more details and check
        // the TODOs and FIXMEs to see what needs to be done
        ResponseEntity<?> response = signupService.signup(login);

        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login) {
        return loginService.login(login);
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }

    @PutMapping("/forgot_password")
    public ResponseEntity<String> forgotPassword(@RequestBody String jsonEmail) {
        return forgotPasswordHelper.processForgotPassword(jsonEmail);
    }

    @PutMapping("/reset_password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestBody String jsonPassword)
            throws LoginNotFoundException {
        return forgotPasswordHelper.processResetPassword(token, jsonPassword);

    }
}
