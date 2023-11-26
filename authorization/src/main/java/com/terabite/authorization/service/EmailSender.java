package com.terabite.authorization.service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.terabite.authorization.repository.LoginRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSender {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private LoginService loginService;

    @Autowired
    private LoginRepository loginRepository;



    public void sendEmail(String recipientEmail, String subject, String body) throws MessagingException, UnsupportedEncodingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("noreply@adaptedstrength.com", "Adapted Strength Support");
        helper.setTo(recipientEmail);
        helper.setSubject(subject);
        helper.setText(body);
        mailSender.send(message);
        
    }

    public void sendForgotPasswordEmail(String email) throws UnsupportedEncodingException, MessagingException, UserNotFoundException{
        //This will change with jwt tokens
        //random 32 character string
        String token = UUID.randomUUID().toString();
        loginRepository.findByEmail(email);
        loginService.updatePasswordResetToken(token, email);
        String siteURL = "localhost:8080/v1/user";
        String resetPasswordLink = siteURL + "/reset_password?token=" + token;

        String subject = "Here's the link to reset your password";

        String body = "\nHello,\n"
            + "\nYou have requested to reset your password.\n"
            + "\nClick the link below to change your password:\n"
            + "\n" + resetPasswordLink + "\n"
            + "\nIf you did not make this request, ignore this email";

        sendEmail(email, subject, body);
    }
}
