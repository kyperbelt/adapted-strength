package com.terabite.authorization.service;

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


    public void processForgotPassword(String jsonEmail){
        ObjectMapper objectMapper = new ObjectMapper();
        Email email;
        Login login;
		try {
			email = objectMapper.readValue(jsonEmail, Email.class);
            login=loginRepository.findByEmail(email.getEmail());
            if(login!= null){
                emailSender.sendForgotPasswordEmail(email.getEmail());
            }
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} 

    }

    public void processResetPassword(String token, String jsonPassword){
        ObjectMapper objectMapper = new ObjectMapper();
        Login login;
        try {
            Password password=objectMapper.readValue(jsonPassword, Password.class);
            login=loginRepository.findByPasswordResetToken(token);
            if(login!=null){
                login.setPassword(password.getPassword());
                login.setResetPasswordToken(null);
                loginRepository.save(login);
            }
            else{
                throw new LoginNotFoundException("Could not find user with token: "+token);
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (LoginNotFoundException e) {
            e.printStackTrace();
        }
    }
}
