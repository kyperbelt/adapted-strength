package com.terabite.programming.service;

import java.util.List;

<<<<<<< HEAD
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
=======
>>>>>>> program_management_redo
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.common.dto.Payload;
import com.terabite.programming.dto.UpdateWeekRequest;
import com.terabite.programming.model.Day;
import com.terabite.programming.model.Week;
import com.terabite.programming.repository.WeekRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WeekService {
    public static final Logger log = LoggerFactory.getLogger(WeekService.class);
    WeekRepository weekRepository;

    public WeekService(WeekRepository weekRepository){
        this.weekRepository=weekRepository;
    }

    public ResponseEntity<?> createNewWeek(Week week){
        weekRepository.save(week);
        return new ResponseEntity<>(week, HttpStatus.OK);
    }

    public ResponseEntity<?> updateWeek(UpdateWeekRequest updateRequest, List<Day> days){
        if(weekRepository.findById(updateRequest.id()).isEmpty()){
<<<<<<< HEAD
            log.error("Week {} not found", updateRequest.id()); 
=======
>>>>>>> program_management_redo
            return new ResponseEntity<>(Payload.of(String.valueOf(updateRequest.id())), HttpStatus.NOT_FOUND);        }
        else{
            Week week = weekRepository.findOneByWeekId(updateRequest.id());
            week.setName(updateRequest.weekName());
            week.setDays(days);
<<<<<<< HEAD
=======

>>>>>>> program_management_redo
            weekRepository.save(week);
            return new ResponseEntity<>(week, HttpStatus.OK);
        }
    }

    public Week getWeekById(long id){
        return weekRepository.findOneByWeekId(id);
    }

    public ResponseEntity<?> getWeek(Week week){
        if(weekRepository.findById(week.getWeekId()).isEmpty()){
            log.error("Week {} not found", week.getWeekId());
            return new ResponseEntity<>(week, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(weekRepository.findOneByWeekId(week.getWeekId()), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getAllWeeks() {
        return new ResponseEntity<>(weekRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<?> deleteWeekByName(Week week){
        if(weekRepository.findById(week.getWeekId()).isEmpty()){
            log.error("Week {} not found", week.getWeekId());
            return new ResponseEntity<>(week, HttpStatus.NOT_FOUND);
        }
        else{
            weekRepository.delete(week);
            return new ResponseEntity<>(week, HttpStatus.OK);
        }
    }

    
}
