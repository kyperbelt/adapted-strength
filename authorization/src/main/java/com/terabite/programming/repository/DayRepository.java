package com.terabite.programming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.programming.model.Day;

public interface DayRepository extends JpaRepository<Day, Long>
{
    Optional <Day> findByName(String dayName);
    Day findOneByName(String dayName);
    Optional <Day> findByDayId(Long id);
    Day findOneByDayId(Long id);
}
