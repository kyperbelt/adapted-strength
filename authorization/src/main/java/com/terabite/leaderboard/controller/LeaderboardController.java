package com.terabite.leaderboard.controller;

import com.terabite.leaderboard.model.Olympic;
import com.terabite.leaderboard.model.Powerlifting;
import com.terabite.leaderboard.service.OlympicService;
import com.terabite.leaderboard.service.PowerliftingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/leaderboard")
public class LeaderboardController {

    @Autowired
    private OlympicService olympicService;


    @Autowired
    private PowerliftingService powerliftingService;

    @PostMapping("/olympic")
    public ResponseEntity<Olympic> addOlympicEntry(@RequestBody Olympic olympic) {
        Olympic savedOlympic = olympicService.addOlympicEntry(olympic);
        return new ResponseEntity<>(savedOlympic, HttpStatus.CREATED);
    }

    @PostMapping("/powerlifting")
    public ResponseEntity<Powerlifting> addPowerliftingEntry(@RequestBody Powerlifting powerlifting) {
        Powerlifting savedPowerlifting = powerliftingService.addPowerliftingEntry(powerlifting);
        return new ResponseEntity<>(savedPowerlifting, HttpStatus.CREATED);
    }

    @DeleteMapping("/olympic/{id}")
    public ResponseEntity<Void> deleteOlympicEntry(@PathVariable Long id) {
        olympicService.deleteOlympicEntry(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/powerlifting/{id}")
    public ResponseEntity<Void> deletePowerliftingEntry(@PathVariable Long id) {
        powerliftingService.deletePowerliftingEntry(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/olympic/top10male")
    public ResponseEntity<List<Olympic>> getTop10MaleAthletesByWeightClass(@RequestParam String weightClass) {
        List<Olympic> topMaleAthletes = olympicService.getTop10MaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }

    @GetMapping("/olympic/top10female")
    public ResponseEntity<List<Olympic>> getTop10FemaleAthletesByWeightClass(@RequestParam String weightClass) {
        List<Olympic> topFemaleAthletes = olympicService.getTop10FemaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }

    @GetMapping("/powerlifting/top10male")
    public ResponseEntity<List<Powerlifting>> getTop10MalePowerliftersByWeightClass(@RequestParam String weightClass) {
        List<Powerlifting> topMalePowerlifters = powerliftingService.getTop10MalePowerliftersByWeightClass(weightClass);
        return new ResponseEntity<>(topMalePowerlifters, HttpStatus.OK);
    }

    @GetMapping("/powerlifting/top10female")
    public ResponseEntity<List<Powerlifting>> getTop10FemalePowerliftersByWeightClass(@RequestParam String weightClass) {
        List<Powerlifting> topFemalePowerlifters = powerliftingService.getTop10FemalePowerliftersByWeightClass(weightClass);
        return new ResponseEntity<>(topFemalePowerlifters, HttpStatus.OK);
    }
}
