package com.terabite.user.service;

import com.terabite.common.dto.Payload;
import com.terabite.programming.ProgrammingApi;
import com.terabite.programming.model.Program;
import com.terabite.user.model.ProgrammingComment;
import com.terabite.user.model.UserInformation;
import com.terabite.user.model.UserProgramming;
import com.terabite.user.repository.ProgrammingCommentRepository;
import com.terabite.user.repository.UserProgrammingRepository;
import com.terabite.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.text.DateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class UserProgrammingService {
    private final UserProgrammingRepository userProgrammingRepository;
    private final ProgrammingCommentRepository commentRepository;
    private final ProgrammingApi programmingApi;
    private final UserRepository userRepository;

    public UserProgrammingService(UserProgrammingRepository userProgrammingRepository,
                                  ProgrammingCommentRepository commentRepository,
                                  ProgrammingApi programmingApi,
                                  UserRepository userRepository) {
        this.userProgrammingRepository = userProgrammingRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.programmingApi = programmingApi;
    }

    public ResponseEntity<?> addProgramming(String userEmail, long programId, int startWeek, long startDateEpoch) {
        Optional<UserInformation> user = userRepository.findByEmail(userEmail);

        if (user.isEmpty()) {
            return new ResponseEntity<>(Payload.of("User not found"), HttpStatus.NOT_FOUND);
        }

        // make sure that programming is not already assigned to user
        List<UserProgramming> userProgrammings = userProgrammingRepository.findByUserInfoEmail(userEmail);
        for (UserProgramming up : userProgrammings) {
            if (up.getAssignedProgramId() == programId) {
                return new ResponseEntity<>(Payload.of("User already has this programming"), HttpStatus.BAD_REQUEST);
            }
        }

        // use startDateEpoch to create a Date object
        Date startDate = new Date(startDateEpoch);

        UserProgramming userProgramming = new UserProgramming();
        userProgramming.setAssignedProgramId(programId);
        userProgramming.setUserInfo(user.get());
        userProgramming.setStartWeek(startWeek);
        userProgramming.setStartDate(startDate);
        userProgrammingRepository.save(userProgramming);
        return new ResponseEntity<>(userProgramming, HttpStatus.OK);
    }

    public ResponseEntity<?> removeProgramming(Long id) {
        Optional<UserProgramming> programming = userProgrammingRepository.findById(id);
        if (programming.isEmpty()) {
            return new ResponseEntity<>(Payload.of("User progamming not found"), HttpStatus.NOT_FOUND);
        }
        userProgrammingRepository.deleteById(id);
        return new ResponseEntity<>(
            Payload.of(
                String.format("Removed user programming %d from %s", id, programming.get().getUserInfo().getEmail())),
            HttpStatus.OK);
    }

    /**
     * Get all UserProgramming for the user with the given userEmail.
     *
     * <br>NOTE: We do not return programming for programs that have been deleted. This is mainly as a backwards
     * compatibility solution since we now delete user programming associated with programs when the program is deleted.
     *
     * @param userEmail the email of the user for whom we are getting the User programming.
     * @return A response with all teh user programming associated with that user.
     */
    public ResponseEntity<?> getUserPrograms(String userEmail) {
        List<Program> existingPrograms = programmingApi.getAllPrograms();
        HashSet<Long> existingProgramSet = new HashSet<>(
            existingPrograms.stream().map((program) -> program.getProgramId()).collect(Collectors.toList()));

        List<UserProgramming> userProgramming =
            userProgrammingRepository.findByUserInfoEmail(userEmail)
                .stream()
                .filter((programming) -> existingProgramSet.contains(programming.getAssignedProgramId()))
                .collect(Collectors.toList());
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
