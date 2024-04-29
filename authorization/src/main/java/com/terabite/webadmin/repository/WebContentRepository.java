package com.terabite.webadmin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.webadmin.model.WebContent;

/**
 * WebContentRepository
 */
public interface WebContentRepository extends JpaRepository<WebContent, Long> {
     Optional<WebContent> findFirstByOrderByIdAsc();
}
