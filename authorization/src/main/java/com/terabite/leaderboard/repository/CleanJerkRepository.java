package com.terabite.leaderboard.repository;

import com.terabite.leaderboard.model.CleanJerk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CleanJerkRepository extends JpaRepository<CleanJerk, Long> {
    List<CleanJerk> findTop10ByWeightClassAndGenderOrderByWeightDesc(String weightClass, char gender);
}
