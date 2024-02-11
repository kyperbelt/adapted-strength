package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.programming.model.Program;
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
        return new ResponseEntity<>(program, HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateProgram(Program program) {
        if(programRepository.findById(program.getProgramId()).isEmpty()){
            return new ResponseEntity<>(program, HttpStatus.NOT_FOUND);
        }
        else{
            programRepository.save(program);
            return new ResponseEntity<>(program, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getProgram(Program program) {
        if(programRepository.findById(program.getProgramId()).isEmpty()){
            return new ResponseEntity<>(program, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(programRepository.findOneByProgramId(program.getProgramId()), HttpStatus.FOUND);
        }
    }

    public ResponseEntity<?> getAllPrograms() {
        return new ResponseEntity<>(programRepository.findAll(), HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> deleteProgram(Program program) {
        if(programRepository.findById(program.getProgramId()).isEmpty()){
            return new ResponseEntity<>(program, HttpStatus.NOT_FOUND);
        }
        else{
            programRepository.delete(program);
            return new ResponseEntity<>(program, HttpStatus.ACCEPTED);
        }
    }

    
}
