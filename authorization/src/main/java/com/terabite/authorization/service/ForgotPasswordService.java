package com.terabite.authorization.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.log.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ForgotPasswordService {
    private final PasswordEncoder passwordEncoder;
    private final LoginRepository loginRepository;
    private final EmailSender emailSender;

    public ForgotPasswordService(LoginRepository loginRepository, EmailSender emailSender, PasswordEncoder passwordEncoder) {
        this.emailSender = emailSender;
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public ResponseEntity<String> processForgotPassword(String jsonEmail) {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode;
        //Optional<Login> login;
        Login login;
        String email;
        try {
            jsonNode = objectMapper.readTree(jsonEmail);
            email = jsonNode.get("email").asText();
            login = loginRepository.findOneByEmail(email);
            if (login != null) {
                emailSender.sendForgotPasswordEmail(email);
                return ResponseEntity.status(HttpStatus.FOUND).body("User found");
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found with provided email");

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
