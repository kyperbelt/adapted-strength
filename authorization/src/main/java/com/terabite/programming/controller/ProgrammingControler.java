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
<<<<<<< HEAD
=======
import com.terabite.common.dto.Payload;
>>>>>>> main
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
import com.terabite.user.UserApi;
import com.terabite.user.model.UserProgramming;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

<<<<<<< HEAD
import java.util.List;

=======
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
>>>>>>> main
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;


@RestController
@RequestMapping("/v1/programming")
public class ProgrammingControler {

    private static final Logger log = LoggerFactory.getLogger(ProgrammingControler.class);
    
    private final RepCycleService repCycleService;
    private final DayService dayService;
    private final WeekService weekService;
    private final ProgramService programService;
    private final UserApi userApi;

    public ProgrammingControler(RepCycleService repCycleService, DayService dayService, WeekService weekService, ProgramService programService, UserApi userApi){
        this.repCycleService=repCycleService;
        this.dayService=dayService;
        this.weekService=weekService;
        this.userApi=userApi;
        this.programService=programService;
    }

    
    //Program endpoints
    @PostMapping("/program")
<<<<<<< HEAD
    public ResponseEntity<?> postProgram(@RequestBody CreateProgramRequest request) {
        Program program = new Program(request.programName(), Lists.newArrayList());
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> createProgram(@RequestBody CreateProgramRequest request) {
        Program program = new Program(request.programName(), Lists.newArrayList());
        program.setDescription(new ProgramDescription(request.programDescription()));
>>>>>>> main
        return programService.createNewProgram(program);
    }

    @PutMapping("/program")
<<<<<<< HEAD
    public ResponseEntity<?> updateProgram(@RequestBody UpdateProgramRequest program) {
        List<Week> weeks = Lists.newArrayList();
        for (int weekId : program.weekIds()) {
            Week week = new Week();
            week.setWeekId(weekId);
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> updateProgram(@RequestBody UpdateProgramRequest program) {
        List<Week> weeks = Lists.newArrayList();
        for (int weekId : program.weekIds()) {
            final Week week = weekService.getWeekById(weekId);
            if (week == null) {
                log.error("Week with id {} not found", weekId);
                continue;
            }
>>>>>>> main
            weeks.add(week);
        }

        return programService.updateProgram(program, weeks);
    }

    @GetMapping("/program/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> getProgram(@RequestParam int id) {
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN', 'ROLE_BASE_CLIENT', 'ROLE_SPECIFIC_CLIENT')")
    public ResponseEntity<?> getProgram(@PathVariable int id) {
>>>>>>> main
        Program program = new Program("name", Lists.newArrayList());
        program.setProgramId(id);

        return programService.getProgram(program);
    }

    @GetMapping("/all_programs")
<<<<<<< HEAD
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
>>>>>>> main
    public ResponseEntity<?> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @DeleteMapping("/program/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> deleteProgram(@RequestParam int id){
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> deleteProgram(@PathVariable int id){
>>>>>>> main
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
<<<<<<< HEAD
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
>>>>>>> main
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
<<<<<<< HEAD
    public ResponseEntity<?> updateWeek(@RequestBody UpdateWeekRequest request) {
        
        List<Day> days = Lists.newArrayList();
        for (int dayId : request.dayIds()) {
            Day day = new Day();
            day.setDayId(dayId);
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> updateWeek(@RequestBody UpdateWeekRequest request) {
        
        List<Day> days = Lists.newArrayList();
        log.info("Day ids: {}", request.dayIds());
        for (int dayId : request.dayIds()) {
            final Day day = dayService.getDayById(dayId);
            log.info("Day: {}", day);
            if (day == null) {
                log.error("Day with id {} not found", dayId);
                continue;
            }
>>>>>>> main
            days.add(day);
        }
        return weekService.updateWeek(request, days);
    }

    @GetMapping("/week/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> getWeek(@RequestParam long id) {
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN', 'ROLE_BASE_CLIENT', 'ROLE_SPECIFIC_CLIENT')")
    public ResponseEntity<?> getWeek(@PathVariable long id) {
>>>>>>> main
        Week week = new Week("name", Lists.newArrayList());
        week.setWeekId(id);
        return weekService.getWeek(week);
    }

    @GetMapping("/week/all_weeks")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
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
    public ResponseEntity<?> deleteWeek(@RequestParam long id){
=======
    public ResponseEntity<?> deleteWeek(@PathVariable long id){
>>>>>>> main
        Week week = weekService.getWeekById(id);

        return weekService.deleteWeekByName(week);
    }


    //Day endpoints
    @PostMapping("/day")
<<<<<<< HEAD
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
>>>>>>> main
    public ResponseEntity<?> createDay(@RequestBody CreateDayRequest request) {
        Day day = new Day(request.dayName(), Lists.newArrayList());

        return dayService.createNewDay(day);
    }

    @PutMapping("/day")
<<<<<<< HEAD
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
>>>>>>> main
    public ResponseEntity<?> updateDay(@RequestBody UpdateDayRequest request) {

        List<RepCycle> repCycles = Lists.newArrayList();
        for (int repCycleId : request.repCycleIds()) {
<<<<<<< HEAD
            RepCycle repCycle = new RepCycle();
            repCycle.setRepCycleId(repCycleId);
=======
            RepCycle repCycle = repCycleService.getRepCycleById(repCycleId);
            if (repCycle == null) {
                log.error("RepCycle with id {} not found", repCycleId);
                continue;
            }
>>>>>>> main
            repCycles.add(repCycle);
        }
        return dayService.updateDay(request, repCycles);
    }

    @GetMapping("/day/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> getDay(@RequestParam long id) {
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN', 'ROLE_BASE_CLIENT', 'ROLE_SPECIFIC_CLIENT')")
    public ResponseEntity<?> getDay(@PathVariable long id) {
>>>>>>> main
        Day day = new Day("name", Lists.newArrayList());
        return dayService.getDay(day);
    }

    @GetMapping("/day/all_days")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> getAllDays() {
        return dayService.getAllDays();
    }

    @DeleteMapping("/day/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> deleteDay(@RequestParam long id){
        Day day = new Day("name", Lists.newArrayList());
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> deleteDay(@PathVariable long id){
        Day day = new Day("name", Lists.newArrayList());
        day.setDayId(id);
>>>>>>> main
        return dayService.deleteDay(day);
    }


    //RepCycle endpoints
    @PostMapping("/rep_cycle")
<<<<<<< HEAD
    public ResponseEntity<?> postRepCycle(@RequestBody CreateRepCycleRequest request) {
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> createRepCycle(@RequestBody CreateRepCycleRequest request) {
>>>>>>> main
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
    public ResponseEntity<?> putRepCycle(@RequestBody UpdateRepCycleRequest repCycle) {
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> updateRepCycle(@RequestBody UpdateRepCycleRequest repCycle) {
>>>>>>> main
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
    public ResponseEntity<?> getRepCycle(@RequestParam long id) {
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN', 'ROLE_BASE_CLIENT', 'ROLE_SPECIFIC_CLIENT')")
    public ResponseEntity<?> getRepCycle(@PathVariable long id) {
>>>>>>> main
        RepCycle repCycle = new RepCycle().withRepCycleId(id);
        return repCycleService.getRepCycle(repCycle);
    }

    @GetMapping("/rep_cycle/all_rep_cycles")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> getAllRepCycles() {
        return repCycleService.getAllRepCycles();
    }

    @DeleteMapping("/rep_cycle/{id}")
<<<<<<< HEAD
    public ResponseEntity<?> deleteRepCycle(@RequestParam long id){
=======
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> deleteRepCycle(@PathVariable long id){
>>>>>>> main
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


    @GetMapping("/user_programs/{programId}")
    public ResponseEntity<?> getAllUsersForProgram(@PathVariable long programId) {
        List<UserProgramming> userProgrammings = userApi.getAllUsersForProgram(programId);
        Map<String, Object> payload = new HashMap<>();
        payload.put("programId", programId);
        payload.put("users", userProgrammings.stream().map(programming -> programming.getUserInfo().getEmail()).toList());
        return ResponseEntity.ok(payload);
    }

}
