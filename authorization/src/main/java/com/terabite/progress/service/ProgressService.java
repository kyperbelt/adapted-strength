package com.terabite.progress.service;

import com.terabite.common.dto.Payload;
import com.terabite.programming.ProgrammingApi;
import com.terabite.programming.model.*;
import com.terabite.progress.model.RepCycleCompletion;
import com.terabite.progress.repository.RepCycleCompletionRepository;
import com.terabite.user.model.UserInformation;
import com.terabite.user.model.UserProgramming;
import com.terabite.user.repository.UserProgrammingRepository;
import com.terabite.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProgressService {
    
    private final RepCycleCompletionRepository completionRepository;
    private final UserRepository userRepository;
    private final UserProgrammingRepository userProgrammingRepository;
    private final ProgrammingApi programmingApi;
    
    public ProgressService(RepCycleCompletionRepository completionRepository,
                          UserRepository userRepository,
                          UserProgrammingRepository userProgrammingRepository,
                          ProgrammingApi programmingApi) {
        this.completionRepository = completionRepository;
        this.userRepository = userRepository;
        this.userProgrammingRepository = userProgrammingRepository;
        this.programmingApi = programmingApi;
    }
    
    public ResponseEntity<?> markComplete(String userEmail, Long repCycleId) {
        Optional<UserInformation> userOpt = userRepository.findByEmail(userEmail);
        if (userOpt.isEmpty()) {
            return new ResponseEntity<>(Payload.of("User not found"), HttpStatus.NOT_FOUND);
        }
        
        UserInformation user = userOpt.get();
        
        // Find which program this repCycle belongs to
        List<UserProgramming> userPrograms = userProgrammingRepository.findByUserInfoEmail(userEmail);
        Long userProgrammingId = null;
        
        for (UserProgramming up : userPrograms) {
            Optional<Program> programOpt = programmingApi.getProgramById(up.getAssignedProgramId());
            if (programOpt.isPresent() && containsRepCycle(programOpt.get(), repCycleId)) {
                userProgrammingId = up.getUserProgrammingId();
                break;
            }
        }
        
        if (userProgrammingId == null) {
            return new ResponseEntity<>(Payload.of("RepCycle not found in user's programs"), HttpStatus.NOT_FOUND);
        }
        
        // Check if there's an existing record for this repCycle
        Optional<RepCycleCompletion> existingOpt = completionRepository.findByUserEmailAndRepCycleId(userEmail, repCycleId);
        RepCycleCompletion completion;
        
        if (existingOpt.isPresent()) {
            completion = existingOpt.get();
            
            // If it's for the same userProgrammingId and already active, return conflict
            if (completion.getUserProgrammingId().equals(userProgrammingId) && completion.getActive()) {
                return new ResponseEntity<>(Payload.of("Movement already completed"), HttpStatus.CONFLICT);
            }
            
            // Update to new assignment
            completion.setUserProgrammingId(userProgrammingId);
            completion.setActive(true);
            completion.setLastModifiedAt(new Date());
            if (!completion.getUserProgrammingId().equals(userProgrammingId)) {
                // New assignment, reset completed date
                completion.setCompletedAt(new Date());
            }
        } else {
            // Create new record
            completion = new RepCycleCompletion(user, repCycleId, userProgrammingId);
        }
        
        completionRepository.save(completion);
        return new ResponseEntity<>(completion, HttpStatus.OK);
    }
    
    public ResponseEntity<?> unmarkComplete(String userEmail, Long repCycleId) {
        Optional<RepCycleCompletion> completionOpt = completionRepository.findByUserEmailAndRepCycleId(userEmail, repCycleId);
        
        if (completionOpt.isEmpty() || !completionOpt.get().getActive()) {
            return new ResponseEntity<>(Payload.of("Completion not found"), HttpStatus.NOT_FOUND);
        }
        
        RepCycleCompletion completion = completionOpt.get();
        completion.setActive(false);
        completion.setLastModifiedAt(new Date());
        completionRepository.save(completion);
        
        return new ResponseEntity<>(Payload.of("Completion removed"), HttpStatus.OK);
    }
    
    public ResponseEntity<?> getUserProgressSummary(String userEmail) {
        List<UserProgramming> userPrograms = userProgrammingRepository.findByUserInfoEmail(userEmail);
        List<Map<String, Object>> programProgress = new ArrayList<>();
        
        for (UserProgramming up : userPrograms) {
            Optional<Program> programOpt = programmingApi.getProgramById(up.getAssignedProgramId());
            if (programOpt.isEmpty()) continue;
            
            Program program = programOpt.get();
            Map<String, Object> progress = new HashMap<>();
            progress.put("userProgrammingId", up.getUserProgrammingId());
            progress.put("programId", program.getProgramId());
            progress.put("programName", program.getName());
            
            int totalMovements = countTotalMovements(program);
            List<RepCycleCompletion> completions = completionRepository.findByUserEmailAndUserProgrammingIdAndActiveTrue(
                userEmail, up.getUserProgrammingId());
            int completedMovements = completions.size();
            
            double percentage = totalMovements > 0 ? (completedMovements * 100.0 / totalMovements) : 0;
            progress.put("completionPercentage", Math.round(percentage * 10) / 10.0);
            progress.put("totalMovements", totalMovements);
            progress.put("completedMovements", completedMovements);
            
            Date lastActivity = completionRepository.findLastActivityByUserEmailAndUserProgrammingId(
                userEmail, up.getUserProgrammingId());
            progress.put("lastActivity", lastActivity);
            
            programProgress.add(progress);
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("programs", programProgress);
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    public ResponseEntity<?> getAllUsersProgress() {
        List<UserInformation> users = (List<UserInformation>) userRepository.findAll();
        List<Map<String, Object>> usersProgress = new ArrayList<>();
        
        for (UserInformation user : users) {
            Map<String, Object> userProgress = new HashMap<>();
            userProgress.put("email", user.getEmail());
            userProgress.put("name", user.getFirstName() + " " + user.getLastName());
            
            List<UserProgramming> userPrograms = userProgrammingRepository.findByUserInfoEmail(user.getEmail());
            userProgress.put("activePrograms", userPrograms.size());
            
            Date lastActivity = completionRepository.findLastActivityByUserEmail(user.getEmail());
            userProgress.put("lastActivity", lastActivity);
            
            // Calculate overall progress across all programs
            int totalMovements = 0;
            int completedMovements = 0;
            
            for (UserProgramming up : userPrograms) {
                Optional<Program> programOpt = programmingApi.getProgramById(up.getAssignedProgramId());
                if (programOpt.isPresent()) {
                    totalMovements += countTotalMovements(programOpt.get());
                    completedMovements += completionRepository.findByUserEmailAndUserProgrammingIdAndActiveTrue(
                        user.getEmail(), up.getUserProgrammingId()).size();
                }
            }
            
            double overallProgress = totalMovements > 0 ? (completedMovements * 100.0 / totalMovements) : 0;
            userProgress.put("overallProgress", Math.round(overallProgress * 10) / 10.0);
            
            usersProgress.add(userProgress);
        }
        
        return new ResponseEntity<>(usersProgress, HttpStatus.OK);
    }
    
    public ResponseEntity<?> getCompletedRepCycleIds(String userEmail) {
        // Get user's current program assignments
        List<UserProgramming> userPrograms = userProgrammingRepository.findByUserInfoEmail(userEmail);
        Set<Long> validUserProgrammingIds = userPrograms.stream()
            .map(UserProgramming::getUserProgrammingId)
            .collect(Collectors.toSet());
        
        // Only get completions for currently assigned programs
        List<RepCycleCompletion> completions = completionRepository.findByUserEmailAndActiveTrue(userEmail);
        List<Long> completedIds = completions.stream()
            .filter(c -> validUserProgrammingIds.contains(c.getUserProgrammingId()))
            .map(RepCycleCompletion::getRepCycleId)
            .collect(Collectors.toList());
        
        Map<String, Object> result = new HashMap<>();
        result.put("completedRepCycleIds", completedIds);
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    public ResponseEntity<?> getProgramCompletionDetails(String userEmail, Long userProgrammingId) {
        List<RepCycleCompletion> completions = completionRepository.findByUserEmailAndUserProgrammingIdAndActiveTrue(
            userEmail, userProgrammingId);
        
        Map<Long, Map<String, Object>> completionMap = new HashMap<>();
        for (RepCycleCompletion completion : completions) {
            Map<String, Object> details = new HashMap<>();
            details.put("completedAt", completion.getCompletedAt());
            details.put("lastModifiedAt", completion.getLastModifiedAt());
            completionMap.put(completion.getRepCycleId(), details);
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("completions", completionMap);
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    private boolean containsRepCycle(Program program, Long repCycleId) {
        for (Week week : program.getWeeks()) {
            for (Day day : week.getDays()) {
                for (RepCycle rc : day.getRepCycles()) {
                    if (rc.getRepCycleId() == repCycleId) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    private int countTotalMovements(Program program) {
        int count = 0;
        for (Week week : program.getWeeks()) {
            for (Day day : week.getDays()) {
                count += day.getRepCycles().size();
            }
        }
        return count;
    }
}
