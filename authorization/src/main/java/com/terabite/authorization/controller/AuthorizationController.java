package com.terabite.authorization.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.terabite.authorization.Payload;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.repository.UserRepository;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.UserInformation;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    private final LoginRepository loginRepository;
    private final UserRepository memberRepository;

    public AuthorizationController(UserRepository memberRepository, LoginRepository loginRepository) {
        this.memberRepository = memberRepository;
        this.loginRepository = loginRepository;
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserInformation userSignupPost(@RequestBody UserInformation userInformation) throws JsonProcessingException {
        memberRepository.save(userInformation);
        return userInformation;
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login) {
        // Will move to service class
        // Make sure login exists
        Login storedLogin = loginRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new LoginNotFoundException(login.getEmail()));


        // Excuse this dogshit
        // Conditionals check cases of good/bad passwords and existing login/logout status
        if (Objects.equals(storedLogin.getPassword(), login.getPassword()) && storedLogin.getLoginStatus() == LoginStatus.LOGGED_OUT) {
            // Good password and not yet logged in
            login.setLoginStatus(LoginStatus.LOGGED_IN);
            loginRepository.save(login);

            return ResponseEntity.ok(login);

        } else if (storedLogin.getLoginStatus() == LoginStatus.LOGGED_IN){
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

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }
}
