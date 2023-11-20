package com.terabite.authorization.service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class EmailSender {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    public void sendEmailWithLink(String recipientEmail, String link, String subject, String body) throws MessagingException, UnsupportedEncodingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("noreply@adaptedstrength.com", "Adapted Strength Support");
        helper.setTo(recipientEmail);
        helper.setSubject(subject);
        helper.setText(body);
        mailSender.send(message);
        
    }

    /*
    public void sendForgotPasswordEmail(HttpServletRequest request){
        String email = request.getParameter("email");
        //This will change with jwt tokens
        //random 32 character string
        String token = UUID.randomUUID().toString();
        try{
            loginService.updatePasswordResetToken(token, email);
        }
        catch(UserNotFoundException u){

        }
        
        String siteURL = request.getRequestURL().toString();
        siteURL=siteURL.replace(request.getServletPath(), "");

        String resetPasswordLink=siteURL+"/reset_password?token="+token;

        String subject = "Here's the link to reset your password";

        String body ="<p>Hello,</p>"
        + "<p>You have requested to reset your password.</p>"
        + "<p>Click the link below to change your password:</p>"
        + "<p><a href=\"" + resetPasswordLink + "\">Change my password</a></p>"
        + "<br>"
        + "<p>If you did not make this request, "
        + "ignore this email.</p>";
        try{
            sendEmailWithLink(email, resetPasswordLink, subject, body);
        }
        catch(UnsupportedEncodingException | MessagingException e){

        }
        
    }
    */

    public void sendForgotPasswordEmail(String email) throws UnsupportedEncodingException, MessagingException{
        //This will change with jwt tokens
        //random 32 character string
        String token = UUID.randomUUID().toString();
        try{
            loginService.updatePasswordResetToken(token, email);
        }
        catch(UserNotFoundException u){

        }
        
        String siteURL = "whatever";

        String resetPasswordLink=siteURL+"/reset_password?token="+token;

        String subject = "Here's the link to reset your password";

        String body ="\nHello,\n"
        + "\nYou have requested to reset your password.\n"
        + "\nClick the link below to change your password:\n"
        + "\n" + resetPasswordLink + "\n"
        + "\nIf you did not make this request, ignore this email";

        sendEmailWithLink(email, resetPasswordLink, subject, body);
        
    }
    
}
