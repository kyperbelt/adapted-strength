package com.terabite.authorization.service;

import com.terabite.authorization.dto.AuthRequest;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SignupService {
    LoginRepository loginRepository;

    PasswordEncoder passwordEncoder;

    public SignupService(LoginRepository loginRepository, PasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> signup(AuthRequest authRequest) {
        if (loginRepository.findByEmail(authRequest.getUsername()).isEmpty()) {
            String plaintextPassword = authRequest.getPassword();
            authRequest.setPassword(passwordEncoder.encode(plaintextPassword));

            Login login = new Login();
            login.setEmail(authRequest.getUsername());
            login.setPassword(authRequest.getPassword());

            // FIXME: this is a temporary solution, we should be using JWTs
            login.setLoginStatus(LoginStatus.LOGGED_IN);

            login.setRoles(new ArrayList<>());
            login.getRoles().add("ROLE_UNVERIFIED");

            loginRepository.save(login);

            return new ResponseEntity<>(String.format("authorized:%s-%s", login.getEmail(), login.getLoginStatus()),
                    HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to create user.");
        }
    }
}
