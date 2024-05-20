package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Bench;
import com.terabite.leaderboard.model.Deadlift;
import com.terabite.leaderboard.repository.DeadliftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeadliftServiceImpl implements DeadliftService {

    private final DeadliftRepository deadliftRepository;

    @Autowired
    public DeadliftServiceImpl(DeadliftRepository deadliftRepository) {
        this.deadliftRepository = deadliftRepository;
    }

    @Override
    public Deadlift addDeadliftEntry(Deadlift deadlift) {
        // Perform any necessary business logic or validation here
        return deadliftRepository.save(deadlift);
    }

    @Override
    public void deleteDeadliftEntry(Long id) {
        deadliftRepository.deleteById(id);
    }

    @Override
    public List<Deadlift> getTop10MaleAthletes() {
        return deadliftRepository.findTop10ByGenderOrderByWeightDesc('M');
    }

    @Override
    public List<Deadlift> getTop10FemaleAthletes() {
        return deadliftRepository.findTop10ByGenderOrderByWeightDesc('W');
    }

    @Override
    public List<Deadlift> getTop10MaleAthletesByWeightClass(String weightClass) {
        return deadliftRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'M');
    }

    @Override
    public List<Deadlift> getTop10FemaleAthletesByWeightClass(String weightClass) {
        return deadliftRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'W');
    }
}

