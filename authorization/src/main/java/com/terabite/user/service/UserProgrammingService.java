package com.terabite.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.terabite.programming.model.Program;
import com.terabite.user.model.UserInformation;
import com.terabite.user.model.UserProgramming;
import com.terabite.user.repository.UserProgrammingRepository;

@Component
public class UserProgrammingService {
    private final UserProgrammingRepository userProgrammingRepository;

    public UserProgrammingService(UserProgrammingRepository userProgrammingRepository){
        this.userProgrammingRepository = userProgrammingRepository;
    }
    
    public ResponseEntity<?> getUserPrograms(String userEmail) {
        List<UserProgramming> programs = userProgrammingRepository.findByUserInfoEmail(userEmail);
        Map<String, Object> payload = new HashMap<>();

        payload.put("userEmail", userEmail);
        payload.put("subscribedPrograms", programs);

        if(programs.isEmpty() ){
            return new ResponseEntity<>(payload, HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(payload, HttpStatus.OK);
        }
    }

}