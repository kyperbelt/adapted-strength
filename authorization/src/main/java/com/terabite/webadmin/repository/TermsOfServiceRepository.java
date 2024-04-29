package com.terabite.webadmin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.webadmin.model.TermsOfService;

/**
 * TermsOfServiceRepository
 */
public interface TermsOfServiceRepository extends JpaRepository<TermsOfService, Long> {
    
    Optional <TermsOfService> findById(Long id);
        
}
