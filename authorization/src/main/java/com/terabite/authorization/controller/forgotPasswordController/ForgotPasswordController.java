package com.terabite.authorization.controller.forgotPasswordController;


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
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    @Lazy
    private JavaMailSender mailSender;

    @Autowired
    private LoginService loginService;

    @Value("${ADAPTED_STRENGTH_EMAIL}")
    private String adaptedStrengthEmail;

    //this environment variable needs to be an application password
    @Value("${ADAPTED_STRENGTH_PASSWORD}")
    private String adaptedStrengthPassword;

    @GetMapping("/forgot_password")
    public int showForgotPasswordForm(){
        return 1;
    }
    
    @PostMapping("/forgot_password")
    public int processForgotPassword(HttpServletRequest request) throws UserNotFoundException{
        String email = request.getParameter("email");

        //random 32 character String
        String token = UUID.randomUUID().toString();

        try{
            loginService.updatePasswordResetToken(token, email);
            String siteURL = request.getRequestURL().toString();
            siteURL=siteURL.replace(request.getServletPath(), "");
            String resetPasswordLink=siteURL+"/reset_password?token="+token;
            sendEmail(email, resetPasswordLink);
        }

        catch(UnsupportedEncodingException | MessagingException | UserNotFoundException e){
            return 0;
        }

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

    //Non Rest methods

    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("noreply@adaptedstrength.com", "Adapted Strength Support");
        helper.setTo(recipientEmail);

        String subject = "Here's the link to reset your password";

        String content ="<p>Hello,</p>"
        + "<p>You have requested to reset your password.</p>"
        + "<p>Click the link below to change your password:</p>"
        + "<p><a href=\"" + link + "\">Change my password</a></p>"
        + "<br>"
        + "<p>If you did not make this request, "
        + "you may want to consider changing your password.</p>";

        helper.setSubject(subject);
        helper.setText(content);
        mailSender.send(message);
    }

    //this implementation is specficially for gmail
    @Bean
    public JavaMailSender getJavaMailSender(){
        JavaMailSenderImpl mailSender= new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername(adaptedStrengthEmail);
        mailSender.setPassword(adaptedStrengthPassword);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

}

