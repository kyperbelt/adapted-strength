package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Squat;

import java.util.List;

public interface SquatService {
    Squat addSquatEntry(Squat squat);
    void deleteSquatEntry(Long id);
    List<Squat> getTop10MaleAthletes();
    List<Squat> getTop10FemaleAthletes();
    List<Squat> getTop10FemaleAthletesByWeightClass(String weightClass);
    List<Squat> getTop10MaleAthletesByWeightClass(String weightClass);
}
