package com.terabite.authorization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LoginService {
    @Autowired
    private LoginRepository loginRepository;

    public LoginService(LoginRepository loginRepository){
        this.loginRepository=loginRepository;
    }

    public void updatePasswordResetToken(String token, String email) throws LoginNotFoundException {
        
        //Optional<Login> login=loginRepository.findOneByEmail(email);
        Login login=loginRepository.findOneByEmail(email);
        
        if(login!=null){
            //login.orElseThrow().setResetPasswordToken(token);
            login.setResetPasswordToken(token);
            loginRepository.save(login);
        }
        else{
            throw new LoginNotFoundException("Could not find a user with the token: "+token);
        }
    }
}
