package com.terabite.progress.controller;

import com.terabite.progress.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/user/progress")
public class ProgressController {
    
    private final ProgressService progressService;
    
    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }
    
    @PostMapping("/movement/{repCycleId}/complete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> markMovementComplete(
            @PathVariable Long repCycleId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return progressService.markComplete(userDetails.getUsername(), repCycleId);
    }
    
    @DeleteMapping("/movement/{repCycleId}/complete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> unmarkMovementComplete(
            @PathVariable Long repCycleId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return progressService.unmarkComplete(userDetails.getUsername(), repCycleId);
    }
    
    @GetMapping("/summary")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserProgressSummary(@AuthenticationPrincipal UserDetails userDetails) {
        return progressService.getUserProgressSummary(userDetails.getUsername());
    }
    
    @GetMapping("/completed")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCompletedRepCycleIds(@AuthenticationPrincipal UserDetails userDetails) {
        return progressService.getCompletedRepCycleIds(userDetails.getUsername());
    }
    
    @GetMapping("/program/{userProgrammingId}/details")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getProgramCompletionDetails(
            @PathVariable Long userProgrammingId,
            @RequestParam String email) {
        return progressService.getProgramCompletionDetails(email, userProgrammingId);
    }
    
    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsersProgress() {
        return progressService.getAllUsersProgress();
    }
}
