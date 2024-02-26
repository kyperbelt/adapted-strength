package com.terabite.programming.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.terabite.programming.model.Program;

public interface ProgramRepository extends JpaRepository<Program, Long>
{
    Optional <Program> findByProgramId(Long id);
    Program findOneByProgramId(Long id);
}
