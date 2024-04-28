package com.terabite.user.service;
import com.terabite.common.dto.Payload;
import com.terabite.user.model.HealthQuestionare;
import com.terabite.user.repository.HealthQuestionareRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * HealthQuestionareService
 */
@Service
public class HealthQuestionareService {
    public static final Payload HEALTH_QUESTIONARE_NOT_FOUND = Payload.of("Health questionare not found");
    public static final Payload HEALTH_QUESTIONARE_ALREADY_EXISTS = Payload.of("Health questionare already exists");
    
    private final HealthQuestionareRepository healthQuestionareRepository;

    public HealthQuestionareService(HealthQuestionareRepository healthQuestionareRepository) {
        this.healthQuestionareRepository = healthQuestionareRepository;
    }


    // get all health questionares
    public List<HealthQuestionare> getAllHealthQuestionares() {
        return healthQuestionareRepository.findAll();
    }

    // get questionare by email 
    public ResponseEntity<?> getHealthQuestionareByEmail(String email) {
        final List<HealthQuestionare> healthQuestionare = healthQuestionareRepository.findByEmail(email); 

        if (healthQuestionare.isEmpty()) {
            return ResponseEntity.badRequest().body(HEALTH_QUESTIONARE_NOT_FOUND);
        }

        return ResponseEntity.ok(healthQuestionare.get(0));
    }

    // create a new health questionare
    public ResponseEntity<?> createHealthQuestionare(HealthQuestionare healthQuestionare) {
        if (healthQuestionareRepository.findById(healthQuestionare.getId()).isPresent()) {
            return ResponseEntity.badRequest().body(HEALTH_QUESTIONARE_ALREADY_EXISTS);
        } else {
            healthQuestionareRepository.save(healthQuestionare);
        }
        return ResponseEntity.ok(healthQuestionare);
    }
    
}
