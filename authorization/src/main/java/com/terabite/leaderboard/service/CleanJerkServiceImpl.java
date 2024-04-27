package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Bench;
import com.terabite.leaderboard.model.CleanJerk;
import com.terabite.leaderboard.repository.CleanJerkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CleanJerkServiceImpl implements CleanJerkService {

    private final CleanJerkRepository cleanJerkRepository;

    @Autowired
    public CleanJerkServiceImpl(CleanJerkRepository cleanJerkRepository) {
        this.cleanJerkRepository = cleanJerkRepository;
    }

    @Override
    public CleanJerk addCleanJerkEntry(CleanJerk cleanJerk) {
        // Perform any necessary business logic or validation here
        return cleanJerkRepository.save(cleanJerk);
    }

    @Override
    public void deleteCleanJerkEntry(Long id) {
        cleanJerkRepository.deleteById(id);
    }

    @Override
    public List<CleanJerk> getTop10MaleAthletes() {
        return cleanJerkRepository.findTop10ByGenderOrderByWeightDesc('M');
    }

    @Override
    public List<CleanJerk> getTop10FemaleAthletes() {
        return cleanJerkRepository.findTop10ByGenderOrderByWeightDesc('W');
    }

    @Override
    public List<CleanJerk> getTop10MaleAthletesByWeightClass(String weightClass) {
        return cleanJerkRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'M');
    }

    @Override
    public List<CleanJerk> getTop10FemaleAthletesByWeightClass(String weightClass) {
        return cleanJerkRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'W');
    }
}
