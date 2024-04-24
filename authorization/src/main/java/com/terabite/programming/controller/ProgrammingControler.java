package com.terabite.programming.controller;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.programming.model.Program;
import com.terabite.programming.model.ProgramDescription;
import com.terabite.programming.model.RepCycle;
<<<<<<< HEAD
import com.google.api.client.util.Lists;
import com.terabite.common.dto.Payload;
=======
>>>>>>> program_management_redo
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
<<<<<<< HEAD
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
=======

>>>>>>> program_management_redo
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
<<<<<<< HEAD
    public ResponseEntity<?> createProgram(@RequestBody CreateProgramRequest request) {
        Program program = new Program(request.programName(), Lists.newArrayList());
        program.setDescription(new ProgramDescription(request.programDescription()));
=======
    public ResponseEntity<?> postProgram(@RequestBody CreateProgramRequest request) {
        Program program = new Program(request.programName(), List.of());
>>>>>>> program_management_redo
        return programService.createNewProgram(program);
    }

    @PutMapping("/program")
    public ResponseEntity<?> updateProgram(@RequestBody UpdateProgramRequest program) {
<<<<<<< HEAD
        List<Week> weeks = Lists.newArrayList();
        for (int weekId : program.weekIds()) {
            final Week week = weekService.getWeekById(weekId);
            if (week == null) {
                log.error("Week with id {} not found", weekId);
                continue;
            }
=======
        List<Week> weeks = List.of();
        for (int weekId : program.weekIds()) {
            Week week = new Week();
            week.setWeekId(weekId);
>>>>>>> program_management_redo
            weeks.add(week);
        }

        return programService.updateProgram(program, weeks);
    }

    @GetMapping("/program/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> getProgram(@PathVariable int id) {
        Program program = new Program("name", Lists.newArrayList());
=======
    public ResponseEntity<?> getProgram(@RequestParam int id) {
        Program program = new Program("name", List.of());
>>>>>>> program_management_redo
        program.setProgramId(id);

        return programService.getProgram(program);
    }

    @GetMapping("/all_programs")
    public ResponseEntity<?> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @DeleteMapping("/program/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> deleteProgram(@PathVariable int id){
        Program program = new Program("name", Lists.newArrayList());
=======
    public ResponseEntity<?> deleteProgram(@RequestParam int id){
        Program program = new Program("name", List.of());
>>>>>>> program_management_redo
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
<<<<<<< HEAD
        Week week = new Week(request.weekName(), Lists.newArrayList());
=======
        Week week = new Week(request.weekName(), List.of());
>>>>>>> program_management_redo

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
        
<<<<<<< HEAD
        List<Day> days = Lists.newArrayList();
        log.info("Day ids: {}", request.dayIds());
        for (int dayId : request.dayIds()) {
            final Day day = dayService.getDayById(dayId);
            log.info("Day: {}", day);
            if (day == null) {
                log.error("Day with id {} not found", dayId);
                continue;
            }
=======
        List<Day> days = List.of();
        for (int dayId : request.dayIds()) {
            Day day = new Day();
            day.setDayId(dayId);
>>>>>>> program_management_redo
            days.add(day);
        }
        return weekService.updateWeek(request, days);
    }

    @GetMapping("/week/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> getWeek(@PathVariable long id) {
        Week week = new Week("name", Lists.newArrayList());
=======
    public ResponseEntity<?> getWeek(@RequestParam long id) {
        Week week = new Week("name", List.of());
>>>>>>> program_management_redo
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
<<<<<<< HEAD
    public ResponseEntity<?> deleteWeek(@PathVariable long id){
=======
    public ResponseEntity<?> deleteWeek(@RequestParam long id){
>>>>>>> program_management_redo
        Week week = weekService.getWeekById(id);

        return weekService.deleteWeekByName(week);
    }


    //Day endpoints
    @PostMapping("/day")
    public ResponseEntity<?> createDay(@RequestBody CreateDayRequest request) {
<<<<<<< HEAD
        Day day = new Day(request.dayName(), Lists.newArrayList());
=======
        Day day = new Day(request.dayName(), List.of());
>>>>>>> program_management_redo

        return dayService.createNewDay(day);
    }

    @PutMapping("/day")
    public ResponseEntity<?> updateDay(@RequestBody UpdateDayRequest request) {

<<<<<<< HEAD
        List<RepCycle> repCycles = Lists.newArrayList();
        for (int repCycleId : request.repCycleIds()) {
            RepCycle repCycle = repCycleService.getRepCycleById(repCycleId);
            if (repCycle == null) {
                log.error("RepCycle with id {} not found", repCycleId);
                continue;
            }
=======
        List<RepCycle> repCycles = List.of();
        for (int repCycleId : request.repCycleIds()) {
            RepCycle repCycle = new RepCycle();
            repCycle.setRepCycleId(repCycleId);
>>>>>>> program_management_redo
            repCycles.add(repCycle);
        }
        return dayService.updateDay(request, repCycles);
    }

    @GetMapping("/day/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> getDay(@PathVariable long id) {
        Day day = new Day("name", Lists.newArrayList());
=======
    public ResponseEntity<?> getDay(@RequestParam long id) {
        Day day = new Day("name", List.of());
>>>>>>> program_management_redo
        return dayService.getDay(day);
    }

    @GetMapping("/day/all_days")
    public ResponseEntity<?> getAllDays() {
        return dayService.getAllDays();
    }

    @DeleteMapping("/day/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> deleteDay(@PathVariable long id){
        Day day = new Day("name", Lists.newArrayList());
        day.setDayId(id);
=======
    public ResponseEntity<?> deleteDay(@RequestParam long id){
        Day day = new Day("name", List.of());
>>>>>>> program_management_redo
        return dayService.deleteDay(day);
    }


    //RepCycle endpoints
    @PostMapping("/rep_cycle")
<<<<<<< HEAD
    public ResponseEntity<?> createRepCycle(@RequestBody CreateRepCycleRequest request) {
=======
    public ResponseEntity<?> postRepCycle(@RequestBody CreateRepCycleRequest request) {
>>>>>>> program_management_redo
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
<<<<<<< HEAD
    public ResponseEntity<?> updateRepCycle(@RequestBody UpdateRepCycleRequest repCycle) {
=======
    public ResponseEntity<?> putRepCycle(@RequestBody UpdateRepCycleRequest repCycle) {
>>>>>>> program_management_redo
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
<<<<<<< HEAD
    public ResponseEntity<?> getRepCycle(@PathVariable long id) {
=======
    public ResponseEntity<?> getRepCycle(@RequestParam long id) {
>>>>>>> program_management_redo
        RepCycle repCycle = new RepCycle().withRepCycleId(id);
        return repCycleService.getRepCycle(repCycle);
    }

    @GetMapping("/rep_cycle/all_rep_cycles")
    public ResponseEntity<?> getAllRepCycles() {
        return repCycleService.getAllRepCycles();
    }

    @DeleteMapping("/rep_cycle/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> deleteRepCycle(@PathVariable long id){
=======
    public ResponseEntity<?> deleteRepCycle(@RequestParam long id){
>>>>>>> program_management_redo
        RepCycle repCycle = new RepCycle().withRepCycleId(id);
        return repCycleService.deleteRepCycle(repCycle);
    }

    @PostMapping("/program/duplicate/{programId}")
    public ResponseEntity<?> duplicateProgram(@PathVariable long programId){
        final Optional<Program> programOptional = programService.getProgramById(programId);
        if(programOptional.isPresent()){
            Program program = programOptional.get().duplicate();
            return programService.createNewProgram(program);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of(String.valueOf(programId)));
    }

    @PostMapping("/week/duplicate/{weekId}")
    public ResponseEntity<?> duplicateWeek(@PathVariable long weekId){
        final Optional<Week> weekOptional = Optional.ofNullable(weekService.getWeekById(weekId));
        if(weekOptional.isPresent()){
            Week week = weekOptional.get().duplicate();
            return weekService.createNewWeek(week);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of(String.valueOf(weekId)));
    }

    @PostMapping("/day/duplicate/{dayId}")
    public ResponseEntity<?> duplicateDay(@PathVariable long dayId){
        final Optional<Day> dayOptional = Optional.ofNullable(dayService.getDayById(dayId));
        if(dayOptional.isPresent()){
            Day day = dayOptional.get().duplicate();
            return dayService.createNewDay(day);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of(String.valueOf(dayId)));
    }

    @PostMapping("/rep_cycle/duplicate/{repCycleId}")
    public ResponseEntity<?> duplicateRepCycle(@PathVariable long repCycleId){
        final Optional<RepCycle> repCycleOptional = Optional.ofNullable(repCycleService.getRepCycleById(repCycleId));
        if(repCycleOptional.isPresent()){
            RepCycle repCycle = repCycleOptional.get().duplicate();
            return repCycleService.createNewRepCycle(repCycle);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Payload.of(String.valueOf(repCycleId)));
    }

}
