package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Bench;
import com.terabite.leaderboard.model.CleanJerk;

import java.util.List;

public interface CleanJerkService {
    CleanJerk addCleanJerkEntry(CleanJerk cleanJerk);
    void deleteCleanJerkEntry(Long id);
    List<CleanJerk> getTop10MaleAthletes();
    List<CleanJerk> getTop10FemaleAthletes();
    List<CleanJerk> getTop10FemaleAthletesByWeightClass(String weightClass);
    List<CleanJerk> getTop10MaleAthletesByWeightClass(String weightClass);
}
