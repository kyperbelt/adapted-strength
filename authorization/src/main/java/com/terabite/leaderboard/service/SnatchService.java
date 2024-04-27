package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Deadlift;
import com.terabite.leaderboard.model.Snatch;

import java.util.List;

public interface SnatchService {
    Snatch addSnatchEntry(Snatch snatch);
    void deleteSnatchEntry(Long id);
    List<Snatch> getTop10MaleAthletes();
    List<Snatch> getTop10FemaleAthletes();
    List<Snatch> getTop10FemaleAthletesByWeightClass(String weightClass);
    List<Snatch> getTop10MaleAthletesByWeightClass(String weightClass);
}
