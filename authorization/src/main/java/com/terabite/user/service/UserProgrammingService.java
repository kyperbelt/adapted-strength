// package com.terabite.user.service;
//
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;
//
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Component;
//
// import com.terabite.user.model.ProgrammingComment;
// import com.terabite.user.model.UserProgramming;
// import com.terabite.user.repository.ProgrammingCommentRepository;
// import com.terabite.user.repository.UserProgrammingRepository;
//
// import jakarta.transaction.Transactional;
//
// @Component
// public class UserProgrammingService {
//     private final UserProgrammingRepository userProgrammingRepository;
//     private final ProgrammingCommentRepository commentRepository;
//
//     public UserProgrammingService(UserProgrammingRepository userProgrammingRepository, ProgrammingCommentRepository commentRepository){
//         this.userProgrammingRepository = userProgrammingRepository;
//         this.commentRepository = commentRepository;
//     }
//     
//     public ResponseEntity<?> getUserPrograms(String userEmail) {
//         List<UserProgramming> userProgramming = userProgrammingRepository.findByUserInfoEmail(userEmail);
//         Map<String, Object> payload = new HashMap<>();
//
//         payload.put("user_email", userEmail);
//         payload.put("subscribed_programs", userProgramming);
//
//         if(userProgramming.isEmpty() ){
//             return new ResponseEntity<>(payload, HttpStatus.NOT_FOUND);
//         }
//         else {
//             return new ResponseEntity<>(payload, HttpStatus.OK);
//         }
//     }
//
//     @Transactional
//     public ResponseEntity<?> addComment(Long id, String comment) {
//         Optional<UserProgramming> programming = userProgrammingRepository.findById(id);
//         if(programming.isEmpty() ){
//             return new ResponseEntity<>(programming, HttpStatus.NOT_FOUND);
//         }
//         UserProgramming programmingActual = programming.get();
//         ProgrammingComment progComment = commentRepository.save(new ProgrammingComment() );
//         programmingActual.getComments().add(progComment);
//         
//         programmingActual = userProgrammingRepository.save(programmingActual);
//         return new ResponseEntity<>(programmingActual, HttpStatus.OK);
//     }
//
// }
