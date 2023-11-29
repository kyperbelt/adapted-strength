package com.terabite.authorization.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;

@Service
public class ForgotPasswordHelper {

    private LoginRepository loginRepository;

    private EmailSender emailSender;

    public ForgotPasswordHelper(LoginRepository loginRepository, EmailSender emailSender){
        this.emailSender=emailSender;
        this.loginRepository=loginRepository;
    }


    public ResponseEntity<String> processForgotPassword(String jsonEmail){
        ObjectMapper objectMapper = new ObjectMapper();
        String email; 
        Login login;
		try {
			email = objectMapper.writeValueAsString(jsonEmail);
            login=loginRepository.findByEmail(email);
            if(login!= null){
                emailSender.sendForgotPasswordEmail(email);
                return ResponseEntity.status(HttpStatus.OK).body("User found");
            }
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} 
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found");

    }

    public ResponseEntity<String> processResetPassword(String token, String jsonPassword){
        ObjectMapper objectMapper = new ObjectMapper();
        Login login;
        String password;
        try {
            password=objectMapper.writeValueAsString(jsonPassword);
            login=loginRepository.findByPasswordResetToken(token);
            if(login!=null){
                login.setPassword(password);
                login.setResetPasswordToken(null);
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
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found");
    }
}
