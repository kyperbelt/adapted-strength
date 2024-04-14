package com.terabite.leaderboard.repository;

import com.terabite.leaderboard.model.Olympic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OlympicRepository extends JpaRepository<Olympic, Long> {
}
