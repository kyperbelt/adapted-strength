package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LoginService {
    public ResponseEntity<?> login(Login login, LoginRepository loginRepository) {
        // Temp, will change to jwt in near future
        // Current implementation only checks for correct password and assigns state
        // Has some edge case checking

        Login storedLogin = loginRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new LoginNotFoundException(login.getEmail()));

        if (Objects.equals(storedLogin.getPassword(), login.getPassword()) && storedLogin.getLoginStatus() == LoginStatus.LOGGED_OUT) {
            // Good password and not yet logged in
            login.setLoginStatus(LoginStatus.LOGGED_IN);
            loginRepository.save(login);

            return ResponseEntity.ok(login);

        } else if (storedLogin.getLoginStatus() == LoginStatus.LOGGED_IN) {
            // Weird case for attempted log in, but user is already logged in
            login.setLoginStatus(LoginStatus.LOGGED_IN);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(login);
        } else {
            // Bad password, not logged in
            login.setLoginStatus(LoginStatus.LOGGED_OUT);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(login);
        }
    }
}
