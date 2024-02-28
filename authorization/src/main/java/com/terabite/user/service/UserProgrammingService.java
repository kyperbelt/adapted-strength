package com.terabite.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.terabite.user.model.UserProgramming;
import com.terabite.user.repository.UserProgrammingRepository;

@Component
public class UserProgrammingService {
    private final UserProgrammingRepository userProgrammingRepository;

    public UserProgrammingService(UserProgrammingRepository userProgrammingRepository){
        this.userProgrammingRepository = userProgrammingRepository;
    }
    
    public ResponseEntity<?> getUserPrograms(String userEmail) {
        List<UserProgramming> userProgramming = userProgrammingRepository.findByUserInfoEmail(userEmail);
        Map<String, Object> payload = new HashMap<>();

        payload.put("user_email", userEmail);
        payload.put("subscribed_programs", userProgramming);

        if(userProgramming.isEmpty() ){
            return new ResponseEntity<>(payload, HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
    }

}