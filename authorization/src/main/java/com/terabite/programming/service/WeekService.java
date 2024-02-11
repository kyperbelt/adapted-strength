package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.programming.model.Week;
import com.terabite.programming.repository.WeekRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class WeekService {
    WeekRepository weekRepository;

    public WeekService(WeekRepository weekRepository){
        this.weekRepository=weekRepository;
    }

    public ResponseEntity<?> createNewWeek(Week week){
        weekRepository.save(week);
        return new ResponseEntity<>(week, HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateWeek(Week week){
        if(weekRepository.findById(week.getId()).isEmpty()){
            return new ResponseEntity<>(week, HttpStatus.NOT_FOUND);        }
        else{
            weekRepository.save(week);
            return new ResponseEntity<>(week, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getWeek(Week week){
        if(weekRepository.findById(week.getId()).isEmpty()){
            return new ResponseEntity<>(week, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(weekRepository.findOneById(week.getId()), HttpStatus.FOUND);
        }
    }

    public ResponseEntity<?> deleteWeekByName(Week week){
        if(weekRepository.findById(week.getId()).isEmpty()){
            return new ResponseEntity<>(week, HttpStatus.NOT_FOUND);
        }
        else{
            weekRepository.delete(week);
            return new ResponseEntity<>(weekRepository.findOneById(week.getId()), HttpStatus.FOUND);
        }
    }
}
