package com.terabite.progress.repository;

import com.terabite.progress.model.RepCycleCompletion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface RepCycleCompletionRepository extends JpaRepository<RepCycleCompletion, Long> {
    
    List<RepCycleCompletion> findByUserEmailAndUserProgrammingIdAndActiveTrue(String email, Long userProgrammingId);
    
    List<RepCycleCompletion> findByUserEmailAndActiveTrue(String email);
    
    boolean existsByUserEmailAndRepCycleIdAndActiveTrue(String email, Long repCycleId);
    
    Optional<RepCycleCompletion> findByUserEmailAndRepCycleId(String email, Long repCycleId);
    
    @Query("SELECT MAX(c.lastModifiedAt) FROM RepCycleCompletion c WHERE c.user.email = ?1")
    Date findLastActivityByUserEmail(String email);
    
    @Query("SELECT MAX(c.lastModifiedAt) FROM RepCycleCompletion c WHERE c.user.email = ?1 AND c.userProgrammingId = ?2")
    Date findLastActivityByUserEmailAndUserProgrammingId(String email, Long userProgrammingId);
}
