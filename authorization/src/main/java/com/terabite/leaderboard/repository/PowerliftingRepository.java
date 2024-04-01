package com.terabite.leaderboard.repository;

import com.terabite.leaderboard.model.Powerlifting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PowerliftingRepository extends JpaRepository<Powerlifting, Long> {
}
