package com.terabite.authorization.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.Payload;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.repository.UserRepository;
import com.terabite.authorization.service.Email;
import com.terabite.authorization.service.EmailSender;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.Password;
import com.terabite.authorization.service.UserInformation;
import com.terabite.authorization.service.UserNotFoundException;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;


import java.util.UUID;
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
    private LoginRepository loginRepository;
    
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
    
    @PutMapping("/forgot_password")
    @ResponseStatus(HttpStatus.OK)
    public void processForgotPassword(@RequestBody String jsonEmail) throws UnsupportedEncodingException, MessagingException, JsonProcessingException, UserNotFoundException{
        ObjectMapper objectMapper = new ObjectMapper();
        Email email=objectMapper.readValue(jsonEmail, Email.class);
        Login login=loginRepository.findByEmail(email.getEmail());
        if(login!= null){
            emailSender.sendForgotPasswordEmail(email.getEmail());
        }
        else{
            throw new UserNotFoundException("No user with email "+email.getEmail());
        } 
    }

    @PutMapping("/reset_password")
    @ResponseStatus(HttpStatus.OK)
    public void resetPassword(@RequestParam String token, @RequestBody String jsonPassword) throws JsonProcessingException, UserNotFoundException{
        ObjectMapper objectMapper = new ObjectMapper();
        Password password=objectMapper.readValue(jsonPassword, Password.class);
        Login login=loginRepository.findByPasswordResetToken(token);
        if(login==null){
            throw new UserNotFoundException("Incorrect Password Reset Token");
        }
        else{
            login.setPassword(password.getPassword());
            login.setResetPasswordToken(null);
            loginRepository.save(login);
        }
    }
}
