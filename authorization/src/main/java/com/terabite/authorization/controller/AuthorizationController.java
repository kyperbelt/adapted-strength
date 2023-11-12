package com.terabite.authorization.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.Payload;
import com.terabite.authorization.service.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    @PostMapping("/signup")
    public ResponseEntity<String> userSignupPost(@RequestBody String request) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        try
        {
            Member member = objectMapper.readValue(request, Member.class);
            System.out.println();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }

        return new ResponseEntity<>(request, HttpStatus.CREATED);
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
