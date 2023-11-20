package com.terabite.authorization.controller.forgotPasswordController;


import com.terabite.authorization.service.EmailSender;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.UserNotFoundException;
import com.terabite.authorization.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;
import java.util.UUID;

@Configuration
@RestController
@RequestMapping("/v1/user")
public class ForgotPasswordController {

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private LoginService loginService;

    //guide had this, we might not need the way our front end works
    @GetMapping("/forgot_password")
    public int showForgotPasswordForm(){
        return 1;
    }
    
    @PostMapping("/forgot_password")
    public int processForgotPassword(HttpServletRequest request) throws UserNotFoundException{
        emailSender.sendForgotPasswordEmail(request);
        //return success or failure
        return 1;
    }

    @GetMapping("/reset_password")
    public int resetPassword(){
        return 1;
    }

    @PostMapping("/reset_password")
    public int changePassword(String newPassword){
        //update password
        return 1;
    }
}

