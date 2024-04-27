package com.terabite.leaderboard.repository;

import com.terabite.leaderboard.model.Bench;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BenchRepository extends JpaRepository<Bench, Long> {
    List<Bench> findTop10ByWeightClassAndGenderOrderByWeightDesc(String weightClass, char gender);
    List<Bench> findTop10ByGenderOrderByWeightDesc(char gender);
}
