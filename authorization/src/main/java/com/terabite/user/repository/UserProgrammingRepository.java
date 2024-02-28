package com.terabite.user.repository;

import org.springframework.data.jpa.repository.Query;

import com.terabite.programming.model.Program;
import com.terabite.user.model.UserProgramming;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProgrammingRepository extends JpaRepository<UserProgramming, Long>{

    // @Query("SELECT p FROM Program p WHERE p.id IN (SELECT upm.programmingId from UserProgrammingMapping upm WHERE upm.userId = ?1)")
    // List<Program> findByUserId(Long userId);
    List<UserProgramming> findByUserInfoEmail(String email);
    String findCommentsById(Long id);
    Program findProgramById(Long id);
}
