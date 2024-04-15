package com.terabite.programming.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.common.dto.Payload;
import com.terabite.programming.dto.UpdateProgramRequest;
import com.terabite.programming.model.Program;
import com.terabite.programming.model.Week;
import com.terabite.programming.repository.ProgramRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class ProgramService {
    ProgramRepository programRepository;

    public ProgramService(ProgramRepository programRepository){
        this.programRepository=programRepository;
    }

    public ResponseEntity<?> createNewProgram(Program program) {
        programRepository.save(program);
        return new ResponseEntity<>(program, HttpStatus.OK);
    }

    public ResponseEntity<?> updateProgram(UpdateProgramRequest request, List<Week> weeks) {
        if(programRepository.findById(request.id()).isEmpty()){
            return new ResponseEntity<>(Payload.of(String.valueOf(request.id())), HttpStatus.NOT_FOUND);
        }
        else{
            Program program = programRepository.findOneByProgramId(request.id());
            program.setName(request.programName());
            program.setWeeks(weeks);
            programRepository.save(program);
            return new ResponseEntity<>(program, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getProgram(Program program) {
        if(programRepository.findById(program.getProgramId()).isEmpty()){
            return new ResponseEntity<>(program, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(programRepository.findOneByProgramId(program.getProgramId()), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getAllPrograms() {
        return new ResponseEntity<>(programRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteProgram(Program program) {
        if(programRepository.findById(program.getProgramId()).isEmpty()){
            return new ResponseEntity<>(program, HttpStatus.NOT_FOUND);
        }
        else{
            programRepository.delete(program);
            return new ResponseEntity<>(program, HttpStatus.OK);
        }
    }

    
}
