package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    LoginRepository loginRepository;

    PasswordEncoder passwordEncoder;

    public SignupService(LoginRepository loginRepository, PasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> signup(final Login login) {
        if (loginRepository.findByEmail(login.getEmail()).isEmpty()) {
            // login.setLoginStatus(LoginStatus.LOGGED_OUT); // temp, find a better way of
            String plaintextPassword = login.getPassword();
            login.setPassword(passwordEncoder.encode(plaintextPassword));
            // TODO: Here we should create the session token that will be used to
            // authenticate the user
            // during the rest of the account creation process

            // login.setJwtToken("<token>");

            // login the user so that they can be authorized to do things
            // FIXME: this is a temporary solution, we should be using JWTs
            login.setLoginStatus(LoginStatus.LOGGED_IN);
            loginRepository.save(login);
            return new ResponseEntity<>(String.format("authorized:%s-%s", login.getEmail(), login.getLoginStatus()),
                    HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to create user.");
        }
    }
}
