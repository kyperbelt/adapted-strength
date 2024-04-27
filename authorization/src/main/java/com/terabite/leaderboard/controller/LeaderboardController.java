package com.terabite.leaderboard.controller;

import com.terabite.leaderboard.model.*;
import com.terabite.leaderboard.service.*;
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
    @Autowired
    private SquatService squatService;
    @Autowired
    private BenchService benchService;
    @Autowired
    private DeadliftService deadliftService;
    @Autowired
    private SnatchService snatchService;
    @Autowired
    private CleanJerkService cleanJerkService;

    /********************************* Post Mappings for adding records *********************************/
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

    @PostMapping("/squat")
    public ResponseEntity<Squat> addSquatEntry(@RequestBody Squat squat) {
        Squat savedSquat = squatService.addSquatEntry(squat);
        return new ResponseEntity<>(savedSquat, HttpStatus.CREATED);
    }

    @PostMapping("/bench")
    public ResponseEntity<Bench> addBenchEntry(@RequestBody Bench bench) {
        Bench savedBench = benchService.addBenchEntry(bench);
        return new ResponseEntity<>(savedBench, HttpStatus.CREATED);
    }

    @PostMapping("/deadlift")
    public ResponseEntity<Deadlift> addDeadliftEntry(@RequestBody Deadlift deadlift) {
        Deadlift savedDeadlift = deadliftService.addDeadliftEntry(deadlift);
        return new ResponseEntity<>(savedDeadlift, HttpStatus.CREATED);
    }

    @PostMapping("/snatch")
    public ResponseEntity<Snatch> addSnatchEntry(@RequestBody Snatch snatch) {
        Snatch savedSnatch = snatchService.addSnatchEntry(snatch);
        return new ResponseEntity<>(savedSnatch, HttpStatus.CREATED);
    }

    @PostMapping("/cleanjerk")
    public ResponseEntity<CleanJerk> addCleanJerkEntry(@RequestBody CleanJerk cleanJerk) {
        CleanJerk savedCleanJerk = cleanJerkService.addCleanJerkEntry(cleanJerk);
        return new ResponseEntity<>(savedCleanJerk, HttpStatus.CREATED);
    }

    /********************************* Delete Mappings for deleting records *********************************/
    @DeleteMapping("/olympic/{id}")
    public ResponseEntity<Void> deleteOlympicEntry(@PathVariable Long id) {
        olympicService.deleteOlympicEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/powerlifting/{id}")
    public ResponseEntity<Void> deletePowerliftingEntry(@PathVariable Long id) {
        powerliftingService.deletePowerliftingEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/squat/{id}")
    public ResponseEntity<Void> deleteSquatEntry(@PathVariable Long id) {
        squatService.deleteSquatEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/bench/{id}")
    public ResponseEntity<Void> deleteBenchEntry(@PathVariable Long id) {
        benchService.deleteBenchEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deadlift/{id}")
    public ResponseEntity<Void> deleteDeadliftEntry(@PathVariable Long id) {
        deadliftService.deleteDeadliftEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/snatch/{id}")
    public ResponseEntity<Void> deleteSnatchEntry(@PathVariable Long id) {
        snatchService.deleteSnatchEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/cleanjerk/{id}")
    public ResponseEntity<Void> deleteCleanJerkEntry(@PathVariable Long id) {
        cleanJerkService.deleteCleanJerkEntry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /********************************* Get Mappings for retrieving records *********************************/
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

    @GetMapping("/squat/top10male")
    public ResponseEntity<List<Squat>> getTop10MaleSquat() {
        List<Squat> topMaleAthletes = squatService.getTop10MaleAthletes();
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/squat/top10female")
    public ResponseEntity<List<Squat>> getTop10FemaleSquat() {
        List<Squat> topFemaleAthletes = squatService.getTop10FemaleAthletes();
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/squat/top10malebyweight")
    public ResponseEntity<List<Squat>> getTop10MaleSquatByWeightClass(@RequestParam String weightClass) {
        List<Squat> topMaleAthletes = squatService.getTop10MaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/squat/top10femalebyweight")
    public ResponseEntity<List<Squat>> getTop10FemaleSquatByWeightClass(@RequestParam String weightClass) {
        List<Squat> topFemaleAthletes = squatService.getTop10FemaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }

    @GetMapping("/bench/top10male")
    public ResponseEntity<List<Bench>> getTop10MaleBench() {
        List<Bench> topMaleAthletes = benchService.getTop10MaleAthletes();
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/bench/top10female")
    public ResponseEntity<List<Bench>> getTop10FemaleBench() {
        List<Bench> topFemaleAthletes = benchService.getTop10FemaleAthletes();
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/bench/top10malebyweight")
    public ResponseEntity<List<Bench>> getTop10MaleBenchByWeightClass(@RequestParam String weightClass) {
        List<Bench> topMaleAthletes = benchService.getTop10MaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/bench/top10femalebyweight")
    public ResponseEntity<List<Bench>> getTop10FemaleBenchByWeightClass(@RequestParam String weightClass) {
        List<Bench> topFemaleAthletes = benchService.getTop10FemaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }

    @GetMapping("/deadlift/top10male")
    public ResponseEntity<List<Deadlift>> getTop10MaleDeadlift() {
        List<Deadlift> topMaleAthletes = deadliftService.getTop10MaleAthletes();
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/deadlift/top10female")
    public ResponseEntity<List<Deadlift>> getTop10FemaleDeadlift() {
        List<Deadlift> topFemaleAthletes = deadliftService.getTop10FemaleAthletes();
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/deadlift/top10malebyweight")
    public ResponseEntity<List<Deadlift>> getTop10MaleDeadliftByWeightClass(@RequestParam String weightClass) {
        List<Deadlift> topMaleAthletes = deadliftService.getTop10MaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/deadlift/top10femalebyweight")
    public ResponseEntity<List<Deadlift>> getTop10FemaleDeadliftByWeightClass(@RequestParam String weightClass) {
        List<Deadlift> topFemaleAthletes = deadliftService.getTop10FemaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }

    @GetMapping("/snatch/top10male")
    public ResponseEntity<List<Snatch>> getTop10MaleSnatch() {
        List<Snatch> topMaleAthletes = snatchService.getTop10MaleAthletes();
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/snatch/top10female")
    public ResponseEntity<List<Snatch>> getTop10FemaleSnatch() {
        List<Snatch> topFemaleAthletes = snatchService.getTop10FemaleAthletes();
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/snatch/top10malebyweight")
    public ResponseEntity<List<Snatch>> getTop10MaleSnatchByWeightClass(@RequestParam String weightClass) {
        List<Snatch> topMaleAthletes = snatchService.getTop10MaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/snatch/top10femalebyweight")
    public ResponseEntity<List<Snatch>> getTop10FemaleSnatchByWeightClass(@RequestParam String weightClass) {
        List<Snatch> topFemaleAthletes = snatchService.getTop10FemaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }

    @GetMapping("/cleanjerk/top10male")
    public ResponseEntity<List<CleanJerk>> getTop10MaleCleanJerk() {
        List<CleanJerk> topMaleAthletes = cleanJerkService.getTop10MaleAthletes();
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/cleanjerk/top10female")
    public ResponseEntity<List<CleanJerk>> getTop10FemaleCleanJerk() {
        List<CleanJerk> topFemaleAthletes = cleanJerkService.getTop10FemaleAthletes();
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/cleanjerk/top10malebyweight")
    public ResponseEntity<List<CleanJerk>> getTop10MaleCleanJerkyWeightClass(@RequestParam String weightClass) {
        List<CleanJerk> topMaleAthletes = cleanJerkService.getTop10MaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topMaleAthletes, HttpStatus.OK);
    }
    @GetMapping("/cleanjerk/top10femalebyweight")
    public ResponseEntity<List<CleanJerk>> getTop10FemaleCleanJerkByWeightClass(@RequestParam String weightClass) {
        List<CleanJerk> topFemaleAthletes = cleanJerkService.getTop10FemaleAthletesByWeightClass(weightClass);
        return new ResponseEntity<>(topFemaleAthletes, HttpStatus.OK);
    }

}
