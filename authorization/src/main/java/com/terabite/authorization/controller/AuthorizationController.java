package com.terabite.authorization.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.Payload;
import com.terabite.authorization.repository.UserRepository;
import com.terabite.authorization.service.EmailSender;
import com.terabite.authorization.service.UserInformation;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.HttpExchange;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailSender emailSender;

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

    @PostMapping("/forgot_password")
    public void processForgotPassword(HttpServletRequest request){
        emailSender.sendForgotPasswordEmail(request);
    }

    @PostMapping("/reset_password")
    public void resetPassword(){
        
    }
}
