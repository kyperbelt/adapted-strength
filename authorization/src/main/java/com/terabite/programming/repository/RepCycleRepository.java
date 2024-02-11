package com.terabite.programming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.programming.model.RepCycle;

public interface RepCycleRepository extends JpaRepository<RepCycle, Long>
{
    Optional <RepCycle> findByName(String repCycleName);    
    RepCycle findOneByName(String repCycleName);
    Optional <RepCycle> findByRepCycleId(Long id);
    RepCycle findOneByRepCycleId(Long id);
}
