package com.terabite.authorization.controller;

import com.terabite.authorization.Payload;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.repository.UserRepository;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.service.LoginService;
import com.terabite.authorization.service.SubscriptionService;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    private final LoginRepository loginRepository;
    private final UserRepository memberRepository;

    private final LoginService loginService;
    private final SubscriptionService subscriptionService;

    public AuthorizationController(UserRepository memberRepository, LoginRepository loginRepository, LoginService loginService, SubscriptionService subscriptionService) {
        this.memberRepository = memberRepository;
        this.loginRepository = loginRepository;
        this.loginService = loginService;
        this.subscriptionService = subscriptionService;
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

    @PostMapping("/subscribe")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> subscribe(@RequestBody UserInformation userInformation) {
        // Retrieve user information from the repository
        Optional<UserInformation> existingUser = memberRepository.findById((int) userInformation.getId());

        if (existingUser.isPresent()) {
            // Update the subscription tier
            existingUser.get().setSubscriptionTier(userInformation.getSubscriptionTier());

            // Save the updated user information
            memberRepository.save(existingUser.get());

            // You can return any response you want, for example, a success message
            return ResponseEntity.ok("Subscription updated successfully\n" + existingUser.get().getSubscriptionTier());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}