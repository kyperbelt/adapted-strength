package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.repository.UserRepository;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    private final LoginRepository loginRepository;
    private final UserRepository memberRepository;

    private final LoginService loginService;

    public AuthorizationController(UserRepository memberRepository, LoginRepository loginRepository, LoginService loginService) {
        this.memberRepository = memberRepository;
        this.loginRepository = loginRepository;
        this.loginService = loginService;
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserInformation userSignupPost(@RequestBody UserInformation userInformation) {
        userInformation.getLogin().setLoginStatus(LoginStatus.LOGGED_OUT); // temp, find a better way of setting column default
        memberRepository.save(userInformation);
        return userInformation;
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLoginPost(@RequestBody Login login) {
        // Manual DI, I don't know how through Spring cuz skill issue
        return loginService.login(login, loginRepository);
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }
}
