package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Bench;
import com.terabite.leaderboard.repository.BenchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BenchServiceImpl implements BenchService {

    private final BenchRepository benchRepository;

    @Autowired
    public BenchServiceImpl(BenchRepository benchRepository) {
        this.benchRepository = benchRepository;
    }

    @Override
    public Bench addBenchEntry(Bench bench) {
        // Perform any necessary business logic or validation here
        return benchRepository.save(bench);
    }

    @Override
    public void deleteBenchEntry(Long id) {
        benchRepository.deleteById(id);
    }

    @Override
    public List<Bench> getTop10MaleAthletes() {
        return benchRepository.findTop10ByGenderOrderByWeightDesc('M');
    }

    @Override
    public List<Bench> getTop10FemaleAthletes() {
        return benchRepository.findTop10ByGenderOrderByWeightDesc('W');
    }

    @Override
    public List<Bench> getTop10MaleAthletesByWeightClass(String weightClass) {
        return benchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'M');
    }

    @Override
    public List<Bench> getTop10FemaleAthletesByWeightClass(String weightClass) {
        return benchRepository.findTop10ByWeightClassAndGenderOrderByWeightDesc(weightClass, 'W');
    }
}
