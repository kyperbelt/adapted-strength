package com.terabite.programming.controller;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.programming.model.Program;
import com.terabite.programming.model.RepCycle;
import com.terabite.programming.model.Day;
import com.terabite.programming.model.Week;
import com.terabite.programming.service.DayService;
import com.terabite.programming.service.ProgramService;
import com.terabite.programming.service.RepCycleService;
import com.terabite.programming.service.WeekService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/v1/programming")
public class ProgrammingControler {
    
    private final RepCycleService repCycleService;
    private final DayService dayService;
    private final WeekService weekService;
    private final ProgramService programService;

    public ProgrammingControler(RepCycleService repCycleService, DayService dayService, WeekService weekService, ProgramService programService){
        this.repCycleService=repCycleService;
        this.dayService=dayService;
        this.weekService=weekService;
        this.programService=programService;
    }

    
    //Program endpoints
    @PostMapping("/program")
    public ResponseEntity<?> postProgram(@RequestBody Program program) {
        return programService.createNewProgram(program);
    }

    @PutMapping("/program")
    public ResponseEntity<?> putProgram(@RequestBody Program program) {
        return programService.updateProgram(program);
    }

    @GetMapping("/program")
    public ResponseEntity<?> getProgram(@RequestBody Program program) {
        return programService.getProgram(program);
    }

    @GetMapping("/program/all_programs")
    public ResponseEntity<?> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @DeleteMapping("/program")
    public ResponseEntity<?> deleteProgram(@RequestBody Program program){
        return programService.deleteProgram(program);
    }

    //Week endpoints
    @PostMapping("/week")
    public ResponseEntity<?> postWeek(@RequestBody Week week) {
        return weekService.createNewWeek(week);
    }

    @PutMapping("/week")
    public ResponseEntity<?> putWeek(@RequestBody Week week) {
        return weekService.updateWeek(week);
    }

    @GetMapping("/week")
    public ResponseEntity<?> getWeek(@RequestBody Week week) {
        return weekService.getWeek(week);
    }

    @GetMapping("/week/all_weeks")
    public ResponseEntity<?> getAllWeeks() {
        return weekService.getAllWeeks();
    }
    
    @DeleteMapping("/week")
    public ResponseEntity<?> deleteWeek(@RequestBody Week week){
        return weekService.deleteWeekByName(week);
    }


    //Day endpoints
    @PostMapping("/day")
    public ResponseEntity<?> postDay(@RequestBody Day day) {
        return dayService.createNewDay(day);
    }

    @PutMapping("/day")
    public ResponseEntity<?> putDay(@RequestBody Day day) {
        return dayService.updateDay(day);
    }

    @GetMapping("/day")
    public ResponseEntity<?> getDay(@RequestBody Day day) {
        return dayService.getDay(day);
    }

    @GetMapping("/day/all_days")
    public ResponseEntity<?> getAllDays() {
        return dayService.getAllDays();
    }

    @DeleteMapping("/day")
    public ResponseEntity<?> deleteDay(@RequestBody Day day){
        return dayService.deleteDay(day);
    }


    //RepCycle endpoints
    @PostMapping("/rep_cycle")
    public ResponseEntity<?> postRepCycle(@RequestBody RepCycle repCycle) {
        return repCycleService.createNewRepCycle(repCycle);
    }

    @PutMapping("/rep_cycle")
    public ResponseEntity<?> putRepCycle(@RequestBody RepCycle repCycle) {
        return repCycleService.updateRepCycle(repCycle);
    }

    @GetMapping("/rep_cycle")
    public ResponseEntity<?> getRepCycle(@RequestBody RepCycle repCycle) {
        return repCycleService.getRepCycle(repCycle);
    }

    @GetMapping("/rep_cycle/all_rep_cycles")
    public ResponseEntity<?> getAllRepCycles() {
        return repCycleService.getAllRepCycles();
    }

    @DeleteMapping("/rep_cycle")
    public ResponseEntity<?> deleteRepCycle(@RequestBody RepCycle repCycle){
        return repCycleService.deleteRepCycle(repCycle);
    }

}
