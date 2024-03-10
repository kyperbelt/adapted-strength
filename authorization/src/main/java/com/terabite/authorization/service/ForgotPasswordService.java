package com.terabite.authorization.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.model.Login;
import com.terabite.common.dto.Payload;
import com.terabite.authorization.log.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;

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
    private final EmailSender emailSender;

    private static Logger log = LoggerFactory.getLogger(ForgotPasswordService.class);

    public ForgotPasswordService(LoginRepository loginRepository, EmailSender emailSender,
            PasswordEncoder passwordEncoder) {
        this.emailSender = emailSender;
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> processForgotPassword(String email) {
        Optional<Login> login = loginRepository.findByEmail(email);
        if (login.isPresent()) {
            emailSender.sendForgotPasswordEmail(email);
            return ResponseEntity.status(HttpStatus.FOUND).body(Payload.of("User found"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("No user found with provided email"));
    }

    /**
     * FIXME ADAPTEDS-126: We need to invalidate the reset tokens after some time.
     */
    public ResponseEntity<?> processResetPassword(String token, String newPassword) {
        String password = newPassword;
        Optional<Login> login = loginRepository.findByResetPasswordToken(token);
        if (login.isPresent()) {
            login.get().setPassword(setHashedPassword(password));
            login.get().setResetPasswordToken(null);
            loginRepository.save(login.get());
            return ResponseEntity.status(HttpStatus.OK).body(Payload.of("Password reset successfully"));
        }

        log.error("No user found with token {}", token);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of("No user found with provided token"));
    }

    public String setHashedPassword(String plaintext) {
        return passwordEncoder.encode(plaintext);
    }
}
