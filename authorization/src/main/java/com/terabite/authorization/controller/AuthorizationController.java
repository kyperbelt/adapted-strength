package com.terabite.authorization.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.Payload;
import com.terabite.authorization.gateway.Gateway;
import com.terabite.authorization.repository.UserRepository;
import com.terabite.authorization.service.UserInformation;
import com.terabite.authorization.gateway.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/gateway")
    public void userGateway(@RequestBody String jsonPayload) throws JsonProcessingException
    {
        Utility util = new Utility();
        ObjectMapper objectMapper = new ObjectMapper();
        Gateway gateway = objectMapper.readValue(jsonPayload, Gateway.class);

        String method = gateway.getMethod();
        String endpoint = gateway.getEndpoint();


        // This will need to break up into a design pattern later (Factory) **NEED TO FIND WAY TO USE GENERIC**
        if(util.getValidEndpoints().get(method) != null && util.getValidEndpoints().get(method).contains(endpoint))
        {
            switch(endpoint) {
                case "signup":
                    userSignupPost((UserInformation) gateway.getPayload());
                    break;
                case "login":
                    userLoginPost();
                    break;
                case "logout":
                    userLogoutPost();
                    break;
            }
        }
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserInformation userSignupPost(@RequestBody UserInformation userInformation) throws JsonProcessingException
    {
        userRepository.save(userInformation);
        return userInformation;
    }

    @PostMapping("/login")
    public Payload userLoginPost() {
        return new Payload("Reached login POST");
    }

    @PostMapping("/logout")
    public Payload userLogoutPost() {
        return new Payload("Reached logout POST");
    }

}
