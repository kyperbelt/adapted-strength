package com.terabite.authorization.service;

import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    LoginRepository loginRepository;

    UserRepository userRepository;

    PasswordEncoder passwordEncoder;

    public SignupService(LoginRepository loginRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public ResponseEntity<?> signup(UserInformation userInformation) {
        if (loginRepository.findByEmail(userInformation.getLogin().getEmail()).isEmpty()) {
            userInformation.getLogin().setLoginStatus(LoginStatus.LOGGED_OUT); // temp, find a better way of setting column default

            // Password hashing stuff
            String plaintextPassword = userInformation.getLogin().getPassword();
            userInformation.getLogin().setPassword(passwordEncoder.encode(plaintextPassword));
            userRepository.save(userInformation);
            return new ResponseEntity<>(userInformation, HttpStatus.CREATED);
        } else {
            return ResponseEntity.badRequest().body(userInformation);
        }
    }
}
