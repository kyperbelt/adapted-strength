package com.terabite.authorization.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.terabite.authorization.Payload;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.repository.UserRepository;
import com.terabite.authorization.service.ForgotPasswordHelper;
import com.terabite.authorization.service.LoginNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    
    private ForgotPasswordHelper forgotPasswordHelper;
    
    private UserRepository userRepository;

    public AuthorizationController(UserRepository userRepository, ForgotPasswordHelper forgotPasswordHelper){
        this.forgotPasswordHelper=forgotPasswordHelper;
        this.userRepository=userRepository;
    }

    
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserInformation userSignupPost(@RequestBody UserInformation userInformation) throws JsonProcessingException
    {
        userRepository.save(userInformation);
        return userInformation;
    }

    @PostMapping("/login")
    public Payload userLoginPost() {
        return new Payload("Reached login POST");
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }
    
    @PutMapping("/forgot_password")
    @ResponseStatus(HttpStatus.OK)
    public void forgotPassword(@RequestBody String jsonEmail) {
        forgotPasswordHelper.processForgotPassword(jsonEmail);
    }

    @PutMapping("/reset_password")
    @ResponseStatus(HttpStatus.OK)
    public void resetPassword(@RequestParam String token, @RequestBody String jsonPassword) throws JsonProcessingException, LoginNotFoundException{
        forgotPasswordHelper.processResetPassword(token, jsonPassword);
    }
}
