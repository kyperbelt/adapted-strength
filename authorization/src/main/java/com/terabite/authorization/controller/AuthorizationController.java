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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public UserInformation userSignupPost(@RequestBody UserInformation userInformation) throws JsonProcessingException
    {
        memberRepository.save(userInformation);
        return userInformation;
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login) {
        login.setLoginStatus(LoginStatus.LOGGED_IN);
        loginRepository.save(login);

        return ResponseEntity.ok(loginRepository.findByEmail(login.getEmail())
                        .orElseThrow(() -> new LoginNotFoundException(login.getEmail())));
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }
}
