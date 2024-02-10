package com.terabite.authorization.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.authorization.repository.ProgramWeekRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ProgramService {
    ProgramWeekRepository programWeekRepository;

    public ProgramService(ProgramWeekRepository programWeekRepository){
        this.programWeekRepository=programWeekRepository;
    }

    public ResponseEntity<?> createNewProgramWeek(ProgramWeek programWeek){
        if(programWeekRepository.findByWeekName(programWeek.getWeekName()).isEmpty()){
            programWeekRepository.save(programWeek);
            return new ResponseEntity<>(programWeek, HttpStatus.CREATED);
        }
        else{
            return ResponseEntity.badRequest().body("Error: There is already a program week with the name: "+programWeek.getWeekName());
        }
    }

    public ResponseEntity<?> updateProgramWeek(ProgramWeek programWeek){
        if(programWeekRepository.findByWeekName(programWeek.getWeekName()).isEmpty()){
            return ResponseEntity.badRequest().body(programWeek);
        }
        else{
            ProgramWeek toBeUpdated= programWeekRepository.findOneByWeekName(programWeek.getWeekName());
            toBeUpdated.setWeekData(programWeek.getWeekData());
            return new ResponseEntity<>(programWeek, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getProgramWeek(String jsonWeekName){
        ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode;
        ProgramWeek programWeek;
        String weekName;
        try{
            jsonNode=objectMapper.readTree(jsonWeekName);
            weekName=jsonNode.get("week_name").asText();
            programWeek=programWeekRepository.findOneByWeekName(weekName);
            if (programWeek!=null){
                return new ResponseEntity<>(programWeek, HttpStatus.FOUND);
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

    public ResponseEntity<?> deleteProgramWeek(String jsonWeekName){
        ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode;
        ProgramWeek programWeek;
        String weekName;
        try{
            jsonNode=objectMapper.readTree(jsonWeekName);
            weekName=jsonNode.get("week_name").asText();
            programWeek=programWeekRepository.findOneByWeekName(weekName);
            if (programWeek!=null){
                programWeekRepository.delete(programWeek);
                return new ResponseEntity<>(programWeek, HttpStatus.OK);
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
