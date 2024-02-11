package com.terabite.programming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.programming.model.Program;

public interface ProgramRepository extends JpaRepository<Program, Long>
{
    Optional<Program> findByName(String progamName);
    Program findOneByName(String programName);
    Optional <Program> findByID(Long id);
    Program findOneById(Long id);
}
