package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Snatch;
import com.terabite.leaderboard.repository.SnatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnatchServiceImpl implements SnatchService {

    private final SnatchRepository snatchRepository;

    @Autowired
    public SnatchServiceImpl(SnatchRepository snatchRepository) {
        this.snatchRepository = snatchRepository;
    }

    @Override
    public Snatch addSnatchEntry(Snatch snatch) {
        // Perform any necessary business logic or validation here
        return snatchRepository.save(snatch);
    }

    @Override
    public void deleteSnatchEntry(Long id) {
        snatchRepository.deleteById(id);
    }

    @Override
    public List<Snatch> getTop10MaleAthletesByWeightClass(String weightClass) {
        return snatchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'M');
    }

    @Override
    public List<Snatch> getTop10FemaleAthletesByWeightClass(String weightClass) {
        return snatchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'F');
    }
}
