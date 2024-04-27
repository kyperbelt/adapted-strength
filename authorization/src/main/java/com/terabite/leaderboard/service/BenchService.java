package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Bench;

import java.util.List;

public interface BenchService {
    Bench addBenchEntry(Bench bench);
    void deleteBenchEntry(Long id);
    List<Bench> getTop10FemaleAthletesByWeightClass(String weightClass);
    List<Bench> getTop10MaleAthletesByWeightClass(String weightClass);
}
