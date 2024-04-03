package com.terabite.leaderboard.controller;

import com.terabite.leaderboard.model.Olympic;
import com.terabite.leaderboard.model.Powerlifting;
import com.terabite.leaderboard.service.OlympicService;
import com.terabite.leaderboard.service.PowerliftingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
