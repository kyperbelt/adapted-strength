package com.terabite.authorization.service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;


import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSender {

    private JavaMailSender javaMailSender;

    private LoginService loginService;

    public EmailSender(JavaMailSender javaMailSender, LoginService loginService){
        this.loginService=loginService;
        this.javaMailSender=javaMailSender;
    }

    public void sendEmail(String recipientEmail, String subject, String body) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom("noreply@adaptedstrength.com", "Adapted Strength Support");
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(body);
            javaMailSender.send(message);
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendForgotPasswordEmail(String email) {
        //This will change with jwt tokens
        //random 32 character string
        String token = UUID.randomUUID().toString();
        try {
            loginService.updatePasswordResetToken(token, email);
        } catch (LoginNotFoundException e) {
            e.printStackTrace();
        }
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
