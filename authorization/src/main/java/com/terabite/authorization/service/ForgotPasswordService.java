package com.terabite.authorization.service;


import com.terabite.authorization.model.ForgotPasswordToken;
import com.terabite.authorization.model.Login;
import com.terabite.common.dto.Payload;
import com.terabite.authorization.repository.ForgotPasswordTokenRepository;
import com.terabite.authorization.repository.LoginRepository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordService {
    private final PasswordEncoder passwordEncoder;
    private final LoginRepository loginRepository;
    private final ForgotPasswordTokenRepository forgotPasswordTokenRepository;
    private final EmailSender emailSender;

    private static Logger log = LoggerFactory.getLogger(ForgotPasswordService.class);

    public ForgotPasswordService(LoginRepository loginRepository, EmailSender emailSender, ForgotPasswordTokenRepository forgotPasswordTokenRepository,
            PasswordEncoder passwordEncoder) {
        this.emailSender = emailSender;
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
        this.forgotPasswordTokenRepository = forgotPasswordTokenRepository;
    }

    public ResponseEntity<?> processForgotPassword(String email) {
        Optional<Login> login = loginRepository.findByEmail(email);
        if (login.isPresent()) {
            emailSender.sendForgotPasswordEmail(email);
            return ResponseEntity.status(HttpStatus.FOUND).body(Payload.of("User found"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("No user found with provided email"));
    }

    public ResponseEntity<?> processResetPassword(String tokenString, String newPassword) {
        ForgotPasswordToken token = forgotPasswordTokenRepository.findByToken(tokenString).orElse(null);
        if(token != null){
            Login login = loginRepository.findByForgotPasswordToken(token).orElse(null);
            if (login != null) {
                LocalDateTime currentDateTime = LocalDateTime.now();
                if (token.getExpiryDate().isAfter(currentDateTime)){
                    login.setPassword(setHashedPassword(newPassword));
                    login.setResetPasswordToken(null);
                    loginRepository.save(login);
                    return ResponseEntity.status(HttpStatus.OK).body(Payload.of("Password reset successfully"));
                }
                else{
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Payload.of("Reset Token expired"));
                } 
            }

        }
        log.error("No user found with token {}", token);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("No user found with provided token"));


    }

    public String setHashedPassword(String plaintext) {
        return passwordEncoder.encode(plaintext);
    }
}
