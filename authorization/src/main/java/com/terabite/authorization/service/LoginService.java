package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    LoginRepository loginRepository;

    PasswordEncoder passwordEncoder;

    public LoginService(LoginRepository loginRepository, PasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> login(Login login) {
        // Temp, will change to jwt in near future
        // Current implementation only checks for correct password and assigns state
        // Has some edge case checking

        Login storedLogin = loginRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new LoginNotFoundException(login.getEmail()));

        String storedHash = storedLogin.getPassword();
        String password = login.getPassword();

        if (passwordEncoder.matches(password, storedHash) && storedLogin.getLoginStatus() == LoginStatus.LOGGED_OUT) {
            // Good password and not yet logged in
            storedLogin.setLoginStatus(LoginStatus.LOGGED_IN);
            loginRepository.save(storedLogin);

            // Good logins return what's stored
            return ResponseEntity.ok(storedLogin);

        } else if (storedLogin.getLoginStatus() == LoginStatus.LOGGED_IN) {
            // Weird case for attempted log in, but user is already logged in
            login.setLoginStatus(LoginStatus.LOGGED_IN);

            // Bad logins return what's sent
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(login);
        } else {
            // Bad password, not logged in
            login.setLoginStatus(null);

            // Bad logins return what's sent
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(login);
        }
    }
}
