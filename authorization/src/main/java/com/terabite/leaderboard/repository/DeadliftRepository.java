package com.terabite.leaderboard.repository;

import com.terabite.leaderboard.model.Bench;
import com.terabite.leaderboard.model.Deadlift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeadliftRepository extends JpaRepository<Deadlift, Long> {
    List<Deadlift> findTop10ByWeightClassAndGenderOrderByWeightDesc(String weightClass, char gender);
    List<Deadlift> findTop10ByGenderOrderByWeightDesc(char gender);
}
