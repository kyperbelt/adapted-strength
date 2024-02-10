package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        if(programRepository.findByProgramName(program.getName()).isEmpty()){
            programRepository.save(program);
            return new ResponseEntity<>(program, HttpStatus.CREATED);
        }
        else{
            return ResponseEntity.badRequest().body("Error: There is already a program with the name: " +program.getName());
        }
    }

    public ResponseEntity<?> updateProgram(Program program) {
        if(programRepository.findByProgramName(program.getName()).isEmpty()){
            return ResponseEntity.badRequest().body("Error: There is no program block by the name: "+program.getName());
        }
        else{
            Program toBeUpdated= programRepository.findOneByProgramName(program.getName());
            toBeUpdated.setProgramBlocks(program.getProgramBlocks());
            return new ResponseEntity<>(program, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getProgram(String jsonProgramName) {
        ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode;
        Program program;
        String programName;
        try{
            jsonNode=objectMapper.readTree(jsonProgramName);
            programName=jsonNode.get("program_name").asText();
            program=programRepository.findOneByProgramName(programName);
            if(program!=null){
                return new ResponseEntity<>(program, HttpStatus.FOUND);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (JsonProcessingException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public ResponseEntity<?> deleteProgram(String jsonProgramName) {
        ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode;
        Program program;
        String programName;
        try{
            jsonNode=objectMapper.readTree(jsonProgramName);
            programName=jsonNode.get("program_name").asText();
            program=programRepository.findOneByProgramName(programName);
            if(program!=null){
                programRepository.delete(program);
                return new ResponseEntity<>(program, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (JsonProcessingException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    
}
