package com.terabite.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.terabite.common.dto.Payload;
import com.terabite.user.model.ProgrammingComment;
import com.terabite.user.model.UserInformation;
import com.terabite.user.model.UserProgramming;
import com.terabite.user.repository.ProgrammingCommentRepository;
import com.terabite.user.repository.UserProgrammingRepository;
import com.terabite.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Component
public class UserProgrammingService {
    private final UserProgrammingRepository userProgrammingRepository;
    private final ProgrammingCommentRepository commentRepository;
    private final UserRepository userRepository;

    public UserProgrammingService(UserProgrammingRepository userProgrammingRepository,
            ProgrammingCommentRepository commentRepository, UserRepository userRepository) {
        this.userProgrammingRepository = userProgrammingRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public ResponseEntity<?> addProgramming(String userEmail, long programId) {
        Optional<UserInformation> user = userRepository.findByEmail(userEmail);
        if (user.isEmpty()) {
            return new ResponseEntity<>(Payload.of("User not found"), HttpStatus.NOT_FOUND);
        }

        UserProgramming userProgramming = new UserProgramming();
        userProgramming.setAssignedProgramId(programId);
        userProgramming.setUserInfo(user.get());
        userProgrammingRepository.save(userProgramming);
        return new ResponseEntity<>(userProgramming, HttpStatus.OK);
    }

    public ResponseEntity<?> removeProgramming(Long id) {
        Optional<UserProgramming> programming = userProgrammingRepository.findById(id);
        if (programming.isEmpty()) {
            return new ResponseEntity<>(Payload.of("User progamming not found"), HttpStatus.NOT_FOUND);
        }
        userProgrammingRepository.deleteById(id);
        return new ResponseEntity<>(Payload.of(
                String.format("Removed user programming %d from %s", id, programming.get().getUserInfo().getEmail())),
                HttpStatus.OK);
    }

    public ResponseEntity<?> getUserPrograms(String userEmail) {
        List<UserProgramming> userProgramming = userProgrammingRepository.findByUserInfoEmail(userEmail);
        Map<String, Object> payload = new HashMap<>();

        payload.put("user_email", userEmail);
        payload.put("subscribed_programs", userProgramming);

        return new ResponseEntity<>(payload, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> addComment(Long id, String comment) {
        Optional<UserProgramming> programming = userProgrammingRepository.findById(id);
        if (programming.isEmpty()) {
            return new ResponseEntity<>(Payload.of("User progamming not found"), HttpStatus.NOT_FOUND);
        }
        UserProgramming programmingActual = programming.get();
        ProgrammingComment progComment = commentRepository.save(new ProgrammingComment());
        programmingActual.getComments().add(progComment);

        programmingActual = userProgrammingRepository.save(programmingActual);
        return new ResponseEntity<>(programmingActual, HttpStatus.OK);
    }

    public ResponseEntity<?> updateComment(Long cid, String updatedComent) {
        Optional<ProgrammingComment> comment = commentRepository.findById(cid);
        if (comment.isEmpty()) {
            return new ResponseEntity<>(comment, HttpStatus.NOT_FOUND);
        }

        ProgrammingComment commentActual = comment.get();
        commentActual.setComment(updatedComent);
        commentRepository.save(commentActual);

        return new ResponseEntity<>(commentActual, HttpStatus.OK);
    }
}
