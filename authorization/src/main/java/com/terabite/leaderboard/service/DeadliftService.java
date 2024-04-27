package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Deadlift;

import java.util.List;

public interface DeadliftService {
    Deadlift addDeadliftEntry(Deadlift deadlift);

    void deleteDeadliftEntry(Long id);

    List<Deadlift> getTop10FemaleAthletesByWeightClass(String weightClass);

    List<Deadlift> getTop10MaleAthletesByWeightClass(String weightClass);
}
