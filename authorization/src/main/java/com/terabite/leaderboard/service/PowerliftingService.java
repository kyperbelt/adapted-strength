package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Powerlifting;

import java.util.List;

public interface PowerliftingService {
    Powerlifting addPowerliftingEntry(Powerlifting powerlifting);
    void deletePowerliftingEntry(Long id);
    List<Powerlifting> getTop10MalePowerliftersByWeightClass(String weightClass);

    List<Powerlifting> getTop10FemalePowerliftersByWeightClass(String weightClass);
}
