package com.terabite.authorization.service;

import com.terabite.GlobalConfiguration;
import com.terabite.authorization.log.LoginNotFoundException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service
public class EmailSender {

    private static final Logger log = LoggerFactory.getLogger(EmailSender.class);
    private final JavaMailSender javaMailSender;
    private final LoginService loginService;

    private final String webUrl;
    private final String domainPort;
    private final String webProtocol;

    public EmailSender(JavaMailSender javaMailSender, LoginService loginService, @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_URL) String webUrl, @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_PORT) String domainPort, @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_PROTOCOL) String webProtocol){
        this.webUrl = webUrl;
        this.webProtocol = webProtocol;
        this.loginService = loginService;
        this.javaMailSender = javaMailSender;
        this.domainPort = domainPort;
    }

    public void sendEmail(String recipientEmail, String subject, String body) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom("support-donotreply@adaptedstrength.com", "Adapted Strength Support");
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(body);
            javaMailSender.send(message);
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendForgotPasswordEmail(String email) {
        //random 32 character string
        String token = UUID.randomUUID().toString();
        log.info("Password reset token: " + token);
        try {
            loginService.updatePasswordResetToken(token, email);
        } catch (LoginNotFoundException e) {
            e.printStackTrace();
        }

        String siteURL = webProtocol + "://" + webUrl + ":" + domainPort;
        String resetPasswordLink = siteURL + "/reset-password?token=" + token;

        String subject = "Here's the link to reset your password";

        String body = "\nHello,\n"
                + "\nYou have requested to reset your password.\n"
                + "\nClick the link below to change your password:\n"
                + "\n" + resetPasswordLink + "\n"
                + "\nIf you did not make this request, ignore this email";

        sendEmail(email, subject, body);
    }
}
