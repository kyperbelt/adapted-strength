package com.terabite.authorization.service;

import com.terabite.authorization.AuthorizationApi;
import com.terabite.authorization.AuthorizationApi.Roles;
import com.terabite.authorization.dto.AuthRequest;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SignupService {
    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public SignupService(LoginRepository loginRepository, PasswordEncoder passwordEncoder, final JwtService jwtService) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public ResponseEntity<?> signup(AuthRequest authRequest) {
        if (loginRepository.findByEmail(authRequest.getUsername()).isEmpty()) {
            String plaintextPassword = authRequest.getPassword();
            authRequest.setPassword(passwordEncoder.encode(plaintextPassword));

            Login login = new Login();
            login.setEmail(authRequest.getUsername());
            login.setPassword(authRequest.getPassword());

            login.setRoles(List.of(Roles.UNVERIFIED, Roles.USER, Roles.TERMS_NOT_ACCEPTED, Roles.ACCOUNT_NOT_SETUP));
            

            loginRepository.save(login);

            return new ResponseEntity<>(String.format("authorized:%s", login.getEmail()),
                    HttpStatus.CREATED);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to create user.");
        }
    }
}
