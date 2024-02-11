package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.terabite.programming.model.Day;
import com.terabite.programming.repository.DayRepository;

public class DayService {
    DayRepository dayRepository;

    public ResponseEntity<?> createNewDay(Day day) {
        dayRepository.save(day);
        return new ResponseEntity<>(day, HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateDay(Day day) {
        if(dayRepository.findById(day.getId()).isEmpty()){
            return new ResponseEntity<>(day, HttpStatus.NOT_FOUND);        }
        else{
            dayRepository.save(day);
            return new ResponseEntity<>(day, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getDay(Day day) {
        if(dayRepository.findById(day.getId()).isEmpty()){
            return new ResponseEntity<>(day, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(dayRepository.findOneById(day.getId()), HttpStatus.FOUND);
        }
    }

    public ResponseEntity<?> deleteDay(Day day) {
        if(dayRepository.findById(day.getId()).isEmpty()){
            return new ResponseEntity<>(day, HttpStatus.NOT_FOUND);
        }
        else{
            dayRepository.delete(day);
            return new ResponseEntity<>(dayRepository.findOneById(day.getId()), HttpStatus.FOUND);
        }
    }
    
}
