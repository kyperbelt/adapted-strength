package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Olympic;
import com.terabite.leaderboard.repository.OlympicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OlympicServiceImpl implements OlympicService {

    @Autowired
    private OlympicRepository olympicRepository;

    @Override
    public Olympic addOlympicEntry(Olympic olympic) {
        // Perform any necessary business logic or validation here
        return olympicRepository.save(olympic);
    }

    @Override
    public void deleteOlympicEntry(Long id) {
        olympicRepository.deleteById(id);
    }
}
