package com.terabite.authorization.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.dto.Payload;
import com.terabite.authorization.log.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordService {
    private final PasswordEncoder passwordEncoder;
    private final LoginRepository loginRepository;
    private final EmailSender emailSender;

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

    public ResponseEntity<String> processResetPassword(String token, String jsonPassword) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode;
        // Optional<Login> login;
        Login login;
        String password;
        try {
            jsonNode = objectMapper.readTree(jsonPassword);
            password = jsonNode.get("password").asText();
            login = loginRepository.findOneByPasswordResetToken(token);

            if (login != null) {
                // login.orElseThrow().setPassword(password);
                // login.orElseThrow().setResetPasswordToken(null);
                login.setPassword(setHashedPassword(password));
                login.setResetPasswordToken(null);
                loginRepository.save(login);
                return ResponseEntity.status(HttpStatus.FOUND).body("User found");
            } else {
                throw new LoginNotFoundException("Could not find user with token: " + token);
            }

        } catch (JsonProcessingException | LoginNotFoundException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not find user with token: " + token);
    }

    public String setHashedPassword(String plaintext) {
        return passwordEncoder.encode(plaintext);
    }
}
