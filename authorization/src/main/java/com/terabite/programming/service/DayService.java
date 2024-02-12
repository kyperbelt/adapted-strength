package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.programming.model.Day;
import com.terabite.programming.repository.DayRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class DayService {
    DayRepository dayRepository;

    public DayService(DayRepository dayRepository){
        this.dayRepository=dayRepository;
    }

    public ResponseEntity<?> createNewDay(Day day) {
        dayRepository.save(day);
        return new ResponseEntity<>(day, HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateDay(Day day) {
        if(dayRepository.findById(day.getDayId()).isEmpty()){
            return new ResponseEntity<>(day, HttpStatus.NOT_FOUND);        }
        else{
            dayRepository.save(day);
            return new ResponseEntity<>(day, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getDay(Day day) {
        if(dayRepository.findById(day.getDayId()).isEmpty()){
            return new ResponseEntity<>(day, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(dayRepository.findOneByDayId(day.getDayId()), HttpStatus.FOUND);
        }
    }

    public ResponseEntity<?> getAllDays() {
        return new ResponseEntity<>(dayRepository.findAll(), HttpStatus.ACCEPTED);
    }

    public ResponseEntity<?> deleteDay(Day day) {
        if(dayRepository.findById(day.getDayId()).isEmpty()){
            return new ResponseEntity<>(day, HttpStatus.NOT_FOUND);
        }
        else{
            dayRepository.delete(day);
            return new ResponseEntity<>(day, HttpStatus.FOUND);
        }
    }
    
}
