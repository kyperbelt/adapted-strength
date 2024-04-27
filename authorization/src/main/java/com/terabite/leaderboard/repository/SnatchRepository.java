package com.terabite.leaderboard.repository;

import com.terabite.leaderboard.model.Bench;
import com.terabite.leaderboard.model.Snatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SnatchRepository extends JpaRepository<Snatch, Long> {
    List<Snatch> findTop10ByWeightClassAndGenderOrderByWeightDesc(String weightClass, char gender);
    List<Snatch> findTop10ByGenderOrderByWeightDesc(char gender);
}
