package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Snatch;
import com.terabite.leaderboard.model.Squat;
import com.terabite.leaderboard.repository.SquatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SquatServiceImpl implements SquatService {

    private final SquatRepository squatRepository;

    @Autowired
    public SquatServiceImpl(SquatRepository squatRepository) {
        this.squatRepository = squatRepository;
    }

    @Override
    public Squat addSquatEntry(Squat squat) {
        // Perform any necessary business logic or validation here
        return squatRepository.save(squat);
    }

    @Override
    public void deleteSquatEntry(Long id) {
        squatRepository.deleteById(id);
    }

    @Override
    public List<Squat> getTop10MaleAthletes() {
        return squatRepository.findTop10ByGenderOrderByWeightDesc('M');
    }

    @Override
    public List<Squat> getTop10FemaleAthletes() {
        return squatRepository.findTop10ByGenderOrderByWeightDesc('W');
    }

    @Override
    public List<Squat> getTop10MaleAthletesByWeightClass(String weightClass) {
        return squatRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'M');
    }

    @Override
    public List<Squat> getTop10FemaleAthletesByWeightClass(String weightClass) {
        return squatRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'W');
    }
}
