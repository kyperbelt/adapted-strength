package com.terabite.authorization.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;

@Service
public class ForgotPasswordHelper {
    @Autowired
    private LoginRepository loginRepository;

    private EmailSender emailSender;

    public ForgotPasswordHelper(LoginRepository loginRepository, EmailSender emailSender){
        this.emailSender=emailSender;
        this.loginRepository=loginRepository;
    }


    public ResponseEntity<String> processForgotPassword(String jsonEmail){
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode;
        Optional<Login> login;
        String email; 
		try {
			jsonNode = objectMapper.readTree(jsonEmail);
            email = jsonNode.get("email").asText();
            login=loginRepository.findByEmail(email);
            if(login!= null){
                emailSender.sendForgotPasswordEmail(email);
                return ResponseEntity.status(HttpStatus.OK).body("User found");
            }
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} 
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found with provided email");

    }

    public ResponseEntity<String> processResetPassword(String token, String jsonPassword){
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode;
        Optional<Login> login;
        String password;
        try {
            jsonNode=objectMapper.readTree(jsonPassword);
            password=jsonNode.get("password").asText();
            login=loginRepository.findByPasswordResetToken(token);

            if(login!=null){
                login.orElseThrow().setPassword(password);
                login.orElseThrow().setResetPasswordToken(null);
                loginRepository.save(login);
                return ResponseEntity.status(HttpStatus.OK).body("User found");
            }
            else{
                throw new LoginNotFoundException("Could not find user with token: "+token);   
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (LoginNotFoundException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not find user with token: "+token);
    }
}
