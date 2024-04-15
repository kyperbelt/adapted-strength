package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Olympic;

import java.util.List;

public interface OlympicService {
    Olympic addOlympicEntry(Olympic olympic);
    void deleteOlympicEntry(Long id);
    List<Olympic> getTop10FemaleAthletesByWeightClass(String weightClass);
    List<Olympic> getTop10MaleAthletesByWeightClass(String weightClass);

}
