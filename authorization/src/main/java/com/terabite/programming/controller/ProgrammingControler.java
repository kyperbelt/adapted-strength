package com.terabite.programming.controller;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.programming.model.Program;
import com.terabite.programming.model.Block;
import com.terabite.programming.model.Week;
import com.terabite.programming.service.BlockService;
import com.terabite.programming.service.ProgramService;
import com.terabite.programming.service.WeekService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/v1/programming")
public class ProgrammingControler {
    
    private final WeekService programWeekService;
    private final BlockService programBlockService;
    private final ProgramService programService;

    public ProgrammingControler(WeekService programWeekService, BlockService programBlockService, ProgramService programService){
        this.programBlockService=programBlockService;
        this.programWeekService=programWeekService;
        this.programService=programService;
    }

    //Program endpoints
    @PutMapping("/program")
    public ResponseEntity<?> programPost(@RequestBody Program program) {
        return programService.createNewProgram(program);
    }

    @PostMapping("/program")
    public ResponseEntity<?> programPut(@RequestBody Program program) {
        return programService.updateProgram(program);
    }

    @GetMapping("/program")
    public ResponseEntity<?> getProgramByName(@RequestBody String jsonProgramName) {
        return programService.getProgram(jsonProgramName);
    }

    @DeleteMapping("/program")
    public ResponseEntity<?> deleteProgramByName(@RequestBody String jsonProgramName){
        return programService.deleteProgram(jsonProgramName);
    }


    //Block endpoints
    @PutMapping("/block")
    public ResponseEntity<?> programBlockPost(@RequestBody Block programBlock) {
        return programBlockService.createNewProgramBlock(programBlock);
    }

    @PostMapping("/block")
    public ResponseEntity<?> programBlockPut(@RequestBody Block programBlock) {
        return programBlockService.updateProgramBlock(programBlock);
    }

    @GetMapping("/block")
    public ResponseEntity<?> getProgramBlockByName(@RequestBody String jsonBlockName) {
        return programBlockService.getProgramBlock(jsonBlockName);
    }

    @DeleteMapping("/block")
    public ResponseEntity<?> deleteProgramBlockByName(@RequestBody String jsonBlockName){
        return programBlockService.deleteProgramBlock(jsonBlockName);
    }



    //Week endpoints
    @PutMapping("/week")
    public ResponseEntity<?> programWeekPost(@RequestBody Week programWeek) {
        return programWeekService.createNewProgramWeek(programWeek);
    }

    @PostMapping("/week")
    public ResponseEntity<?> programWeekPut(@RequestBody Week programWeek) {
        return programWeekService.updateProgramWeek(programWeek);
    }

    @GetMapping("/week")
    public ResponseEntity<?> getProgramWeekByName(@RequestBody String jsonWeekName) {
        return programWeekService.getProgramWeek(jsonWeekName);
    }

    @DeleteMapping("/week")
    public ResponseEntity<?> deleteProgramWeekByName(@RequestBody String jsonWeekName){
        return programWeekService.deleteProgramWeek(jsonWeekName);
    }
}
