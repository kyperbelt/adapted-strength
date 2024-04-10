package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Powerlifting;

public interface PowerliftingService {
    Powerlifting addPowerliftingEntry(Powerlifting powerlifting);
    void deletePowerliftingEntry(Long id);
}
