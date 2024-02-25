package com.terabite.programming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.programming.model.Program;

public interface ProgramRepository extends JpaRepository<Program, Long>
{
    Optional <Program> findByProgramId(Long id);
    Program findOneByProgramId(Long id);
}
