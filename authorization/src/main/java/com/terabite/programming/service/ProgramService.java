package com.terabite.programming.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.common.dto.Payload;
import com.terabite.programming.dto.UpdateProgramRequest;
import com.terabite.programming.model.Program;
import com.terabite.programming.model.ProgramDescription;
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
    
    public Optional<Program> getProgramById(long id){
        return programRepository.findById(id);
    }

    public ResponseEntity<?> updateProgram(UpdateProgramRequest request, List<Week> weeks) {
        Optional<Program> programOptional = programRepository.findById(request.programId());
        if(programOptional.isEmpty()){
            return new ResponseEntity<>(Payload.of(String.valueOf(request.programId())), HttpStatus.NOT_FOUND);
        }
        else{
            Program program = programOptional.get();
            program.setName(request.programName());
            program.setWeeks(weeks);
            program.getDescription().setBody(request.programDescription());
            programRepository.save(program);
            return new ResponseEntity<>(program, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getProgram(Program program) {
        Optional<Program> programOptional = programRepository.findById(program.getProgramId());
        if(programOptional.isEmpty()){
            return new ResponseEntity<>(program, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(programOptional.get(), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getAllPrograms() {
        return new ResponseEntity<>(programRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteProgram(Program program) {
        Optional<Program> programOptional = programRepository.findById(program.getProgramId());
        if(programOptional.isEmpty()){
            return new ResponseEntity<>(program, HttpStatus.NOT_FOUND);
        }
        else{
            programRepository.delete(programOptional.get());
            return new ResponseEntity<>(program, HttpStatus.OK);
        }
    }

    
}