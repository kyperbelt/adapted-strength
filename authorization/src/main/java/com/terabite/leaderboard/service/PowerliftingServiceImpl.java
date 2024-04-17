package com.terabite.leaderboard.service;

import com.terabite.leaderboard.model.Powerlifting;
import com.terabite.leaderboard.repository.PowerliftingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PowerliftingServiceImpl implements PowerliftingService {

    @Autowired
    private PowerliftingRepository powerliftingRepository;

    @Override
    public Powerlifting addPowerliftingEntry(Powerlifting powerlifting) {
        // Perform any necessary business logic or validation here
        return powerliftingRepository.save(powerlifting);
    }

    @Override
    public void deletePowerliftingEntry(Long id) {
        powerliftingRepository.deleteById(id);
    }

    @Override
    public List<Powerlifting> getTop10MalePowerliftersByWeightClass(String weightClass) {
        return powerliftingRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(weightClass, 'M');
    }

    @Override
    public List<Powerlifting> getTop10FemalePowerliftersByWeightClass(String weightClass) {
        return powerliftingRepository.findTop10ByWeightClassAndGenderOrderByTotalDesc(weightClass, 'W');
    }
}
