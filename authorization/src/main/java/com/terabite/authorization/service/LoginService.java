package com.terabite.authorization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.User;
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

        login.setPassword(newPassword);
        //we should have password encoding here
        //set user password, need to hear back from jeff, create instance of login?

        login.setResetPasswordToken(null);
        loginRepository.save(login);
    }
}
