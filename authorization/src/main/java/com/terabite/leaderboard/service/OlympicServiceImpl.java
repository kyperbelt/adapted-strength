package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Olympic;
import com.terabite.leaderboard.model.Powerlifting;
import com.terabite.leaderboard.repository.OlympicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OlympicServiceImpl implements OlympicService {

    private final OlympicRepository olympicRepository;

    @Autowired
    public OlympicServiceImpl(OlympicRepository olympicRepository) {
        this.olympicRepository = olympicRepository;
    }

    @Override
    public Olympic addOlympicEntry(Olympic olympic) {
        // Perform any necessary business logic or validation here
        return olympicRepository.save(olympic);
    }

    @Override
    public void deleteOlympicEntry(Long id) {
        olympicRepository.deleteById(id);
    }

    @Override
    public List<Olympic> getTop10MaleAthletesByWeightClass(String weightClass) {
        return olympicRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(weightClass, 'M');
    }

    @Override
    public List<Olympic> getTop10FemaleAthletesByWeightClass(String weightClass) {
        // Implement the logic to fetch top 10 female athletes by weight class
        // You can use the repository method here
        return olympicRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(weightClass, 'W');
    }
}
