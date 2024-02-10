package com.terabite.programming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.programming.model.Week;

public interface WeekRepository extends JpaRepository<Week, Long> 
{    
    Optional <Week> findByWeekName(String programWeekName);
    Week findOneByWeekName(String programWeekName);

}
