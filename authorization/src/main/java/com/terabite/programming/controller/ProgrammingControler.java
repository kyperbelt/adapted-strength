package com.terabite.programming.controller;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.programming.model.Program;
import com.terabite.programming.model.ProgramDescription;
import com.terabite.programming.model.RepCycle;
import com.google.api.client.util.Lists;
import com.terabite.programming.dto.CreateDayRequest;
import com.terabite.programming.dto.CreateProgramRequest;
import com.terabite.programming.dto.CreateRepCycleRequest;
import com.terabite.programming.dto.CreateWeekRequest;
import com.terabite.programming.dto.UpdateDayRequest;
import com.terabite.programming.dto.UpdateProgramRequest;
import com.terabite.programming.dto.UpdateRepCycleRequest;
import com.terabite.programming.dto.UpdateWeekRequest;
import com.terabite.programming.model.Day;
import com.terabite.programming.model.Week;
import com.terabite.programming.service.DayService;
import com.terabite.programming.service.ProgramService;
import com.terabite.programming.service.RepCycleService;
import com.terabite.programming.service.WeekService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/v1/programming")
public class ProgrammingControler {

    private static final Logger log = LoggerFactory.getLogger(ProgrammingControler.class);
    
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
    public ResponseEntity<?> createProgram(@RequestBody CreateProgramRequest request) {
        Program program = new Program(request.programName(), Lists.newArrayList());
        program.setDescription(new ProgramDescription(request.programDescription()));
        return programService.createNewProgram(program);
    }

    @PutMapping("/program")
    public ResponseEntity<?> updateProgram(@RequestBody UpdateProgramRequest program) {
        List<Week> weeks = Lists.newArrayList();
        for (int weekId : program.weekIds()) {
            weeks.add(weekService.getWeekById(weekId));
        }

        return programService.updateProgram(program, weeks);
    }

    @GetMapping("/program/{id}")
    public ResponseEntity<?> getProgram(@PathVariable int id) {
        Program program = new Program("name", Lists.newArrayList());
        program.setProgramId(id);

        return programService.getProgram(program);
    }

    @GetMapping("/all_programs")
    public ResponseEntity<?> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @DeleteMapping("/program/{id}")
    public ResponseEntity<?> deleteProgram(@PathVariable int id){
        Program program = new Program("name", Lists.newArrayList());
        program.setProgramId(id);   

        return programService.deleteProgram(program);
    }

    /**
     * POST MAPING EXAMPLE: 
     <p>
     {
        "weekName": "Week 1",
        "weekDescription": "This is the first week of the program"
     }
     <p>
     */
    @PostMapping("/week")
    public ResponseEntity<?> createWeek(@RequestBody CreateWeekRequest request) {
        Week week = new Week(request.weekName(), Lists.newArrayList());

        return weekService.createNewWeek(week);
    }

    /**
     * POST MAPING EXAMPLE:
        <p>
        {
            "weekId": 0,
            "weekName": "Week 1",
            "days":[]
        }
        <p>
    */
    @PutMapping("/week")
    public ResponseEntity<?> updateWeek(@RequestBody UpdateWeekRequest request) {
        
        List<Day> days = Lists.newArrayList();
        for (int dayId : request.dayIds()) {
            Day day = new Day();
            day.setDayId(dayId);
            days.add(day);
        }
        return weekService.updateWeek(request, days);
    }

    @GetMapping("/week/{id}")
    public ResponseEntity<?> getWeek(@PathVariable long id) {
        Week week = new Week("name", Lists.newArrayList());
        week.setWeekId(id);
        return weekService.getWeek(week);
    }

    @GetMapping("/week/all_weeks")
    public ResponseEntity<?> getAllWeeks() {
        return weekService.getAllWeeks();
    }

    @GetMapping("/week/all_weeks/{programId}")
    public ResponseEntity<?> getAllWeeksByProgramId(@PathVariable long programId) {
        List<Week> weeks = Lists.newArrayList();

        Optional<Program> programOptional = programService.getProgramById(programId);

        if(programOptional.isPresent()){
            weeks = programOptional.get().getWeeks();
        }
        return ResponseEntity.ok(weeks);

    }
    
    @DeleteMapping("/week/{id}")
    public ResponseEntity<?> deleteWeek(@PathVariable long id){
        Week week = weekService.getWeekById(id);

        return weekService.deleteWeekByName(week);
    }


    //Day endpoints
    @PostMapping("/day")
    public ResponseEntity<?> createDay(@RequestBody CreateDayRequest request) {
        Day day = new Day(request.dayName(), Lists.newArrayList());

        return dayService.createNewDay(day);
    }

    @PutMapping("/day")
    public ResponseEntity<?> updateDay(@RequestBody UpdateDayRequest request) {

        List<RepCycle> repCycles = Lists.newArrayList();
        for (int repCycleId : request.repCycleIds()) {
            RepCycle repCycle = repCycleService.getRepCycleById(repCycleId);
            if (repCycle == null) {
                log.error("RepCycle with id {} not found", repCycleId);
                continue;
            }
            repCycles.add(repCycle);
        }
        return dayService.updateDay(request, repCycles);
    }

    @GetMapping("/day/{id}")
    public ResponseEntity<?> getDay(@PathVariable long id) {
        Day day = new Day("name", Lists.newArrayList());
        return dayService.getDay(day);
    }

    @GetMapping("/day/all_days")
    public ResponseEntity<?> getAllDays() {
        return dayService.getAllDays();
    }

    @DeleteMapping("/day/{id}")
    public ResponseEntity<?> deleteDay(@PathVariable long id){
        Day day = new Day("name", Lists.newArrayList());
        return dayService.deleteDay(day);
    }


    //RepCycle endpoints
    @PostMapping("/rep_cycle")
    public ResponseEntity<?> createRepCycle(@RequestBody CreateRepCycleRequest request) {
        RepCycle repCycle = new RepCycle().withName(request.repCycleName())
                                        // .withDescription(request.repCycleDescription())
                                        .withNumReps(request.numReps())
                                        .withNumSets(request.numSets())
                                        .withWeight(request.weight())
                                        .withRestTime(request.restTime())
                                        .withCoachNotes(request.coachNotes())
                                        .withWorkoutOrder(request.workoutOrder())
                                        .withEquipment(request.equipment())
                                        .withMovementId(request.movementId());

        return repCycleService.createNewRepCycle(repCycle);
    }

    @PutMapping("/rep_cycle")
    public ResponseEntity<?> putRepCycle(@RequestBody UpdateRepCycleRequest repCycle) {
        RepCycle updatedRepCycle = new RepCycle()
                                        .withRepCycleId(repCycle.id())
                                        .withName(repCycle.repCycleName().orElse(null))
                                        .withEquipment(repCycle.equipment().orElse(null))
                                        .withNumSets(repCycle.numSets().orElse(null))
                                        .withNumReps(repCycle.numReps().orElse(null))
                                        .withWeight(repCycle.weight().orElse(null))
                                        .withRestTime(repCycle.restTime().orElse(null))
                                        .withCoachNotes(repCycle.coachNotes().orElse(null))
                                        .withWorkoutOrder(repCycle.workoutOrder().orElse(null))
                                        .withMovementId(repCycle.movementId().orElse(null));

        return repCycleService.updateRepCycle(updatedRepCycle);
    }

    @GetMapping("/rep_cycle/{id}")
    public ResponseEntity<?> getRepCycle(@PathVariable long id) {
        RepCycle repCycle = new RepCycle().withRepCycleId(id);
        return repCycleService.getRepCycle(repCycle);
    }

    @GetMapping("/rep_cycle/all_rep_cycles")
    public ResponseEntity<?> getAllRepCycles() {
        return repCycleService.getAllRepCycles();
    }

    @DeleteMapping("/rep_cycle/{id}")
    public ResponseEntity<?> deleteRepCycle(@PathVariable long id){
        RepCycle repCycle = new RepCycle().withRepCycleId(id);
        return repCycleService.deleteRepCycle(repCycle);
    }

}
