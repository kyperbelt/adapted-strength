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

    public void updatePasswordResetToken(String token, String email) throws UserNotFoundException {
        
        Login login=loginRepository.findByEmail(email);
        
        if(login!=null){
            login.setResetPasswordToken(token);
            loginRepository.save(login);
        }
        else{
            //not sure about this, we don't want expose emails to attackers
            throw new UserNotFoundException("Could not find a user with the email "+email);
        }
    }

    public void updatePassword(Login login, String newPassword){

        //we should have password encoding here
        login.setPassword(newPassword);

        login.setResetPasswordToken(null);
        loginRepository.save(login);
    }

    public Login findByEmail(String email){
        Login login = loginRepository.findByEmail(email);
        return login;
    }
}
