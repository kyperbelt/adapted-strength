package com.terabite.authorization.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfiguration {
    @Value("${ADAPTED_STRENGTH_EMAIL:abc@example.com}")
    private String adaptedStrengthEmail;

    // this environment variable should be an application password
    @Value("${ADAPTED_STRENGTH_PASSWORD:123456}")
    private String adaptedStrengthPassword;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setUsername(adaptedStrengthEmail);
        mailSender.setPassword(adaptedStrengthPassword);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.starttls.enable", "true");

        return mailSender;
    }
}
