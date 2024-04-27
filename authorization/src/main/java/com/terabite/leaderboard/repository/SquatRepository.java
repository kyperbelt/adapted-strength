package com.terabite.leaderboard.repository;

import com.terabite.leaderboard.model.Squat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SquatRepository extends JpaRepository<Squat, Long> {
    List<Squat> findTop10ByWeightClassAndGenderOrderByWeightDesc(String weightClass, char gender);
}
