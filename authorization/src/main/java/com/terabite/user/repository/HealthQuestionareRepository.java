package com.terabite.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.user.model.HealthQuestionare;

/**
 * HealthQRepository
 */
public interface HealthQuestionareRepository extends JpaRepository<HealthQuestionare, Long> {

    
    public List<HealthQuestionare> findAll();
    public Optional<HealthQuestionare> findById(Long id);
    public List<HealthQuestionare> findByEmail(String email);
    
}
