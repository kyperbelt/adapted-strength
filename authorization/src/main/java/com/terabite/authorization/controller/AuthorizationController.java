package com.terabite.authorization.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.Payload;
import com.terabite.authorization.accessingdatamysql.MemberRepository;
import com.terabite.authorization.service.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/v1/user")
public class AuthorizationController {
    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/signup")
    public ResponseEntity<Member> userSignupPost(@RequestBody String request) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Member m = objectMapper.readValue(request, Member.class);


        memberRepository.save(m);
        return new ResponseEntity<>(m, HttpStatus.CREATED);
    }

    @GetMapping("/getmembers")
    public @ResponseBody Iterable<Member> getMembers() {
        return memberRepository.findAll();
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
