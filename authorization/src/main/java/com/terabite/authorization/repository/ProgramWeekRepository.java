package com.terabite.authorization.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.authorization.service.ProgramWeek;

public interface ProgramWeekRepository extends JpaRepository<ProgramWeek, Long> 
{    
    Optional <ProgramWeek> findByWeekName(String programWeekName);
    ProgramWeek findOneByWeekName(String programWeekName);

}
