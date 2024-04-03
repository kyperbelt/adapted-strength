package com.terabite.leaderboard.service;

        import com.terabite.leaderboard.model.Olympic;

public interface OlympicService {
    Olympic addOlympicEntry(Olympic olympic);
    void deleteOlympicEntry(Long id);
}
