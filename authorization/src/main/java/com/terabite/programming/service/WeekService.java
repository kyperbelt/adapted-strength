package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terabite.programming.model.Week;
import com.terabite.programming.repository.WeekRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WeekService {
    WeekRepository programWeekRepository;

    public WeekService(WeekRepository programWeekRepository){
        this.programWeekRepository=programWeekRepository;
    }

    public ResponseEntity<?> createNewProgramWeek(Week programWeek){
        if(programWeekRepository.findByWeekName(programWeek.getName()).isEmpty()){
            programWeekRepository.save(programWeek);
            return new ResponseEntity<>(programWeek, HttpStatus.CREATED);
        }
        else{
            return ResponseEntity.badRequest().body("Error: There is already a program week with the name: "+programWeek.getName());
        }
    }

    public ResponseEntity<?> updateProgramWeek(Week programWeek){
        if(programWeekRepository.findByWeekName(programWeek.getName()).isEmpty()){
            return ResponseEntity.badRequest().body("Error: There is no program week by the name: "+programWeek.getName());
        }
        else{
            Week toBeUpdated= programWeekRepository.findOneByWeekName(programWeek.getName());
            toBeUpdated.setWeekData(programWeek.getWeekData());
            return new ResponseEntity<>(programWeek, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getProgramWeek(String jsonWeekName){
        ObjectMapper objectMapper=new ObjectMapper();
        JsonNode jsonNode;
        Week programWeek;
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
        Week programWeek;
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
