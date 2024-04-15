package com.terabite.programming.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.common.dto.Payload;
import com.terabite.programming.dto.UpdateDayRequest;
import com.terabite.programming.model.Day;
import com.terabite.programming.model.RepCycle;
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

    public ResponseEntity<?> updateDay(UpdateDayRequest request, List<RepCycle> repCycles) {
        if(dayRepository.findById(request.id()).isEmpty()){
            return new ResponseEntity<>(Payload.of(String.valueOf(request.id())), HttpStatus.NOT_FOUND);        }
        else{
            Day day = dayRepository.findOneByDayId(request.id());
            day.setName(request.dayName());
            // day.setDescription(request.dayDescription());
            day.setRepCycles(repCycles);

            dayRepository.save(day);
            return new ResponseEntity<>(day, HttpStatus.OK);
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
        return new ResponseEntity<>(dayRepository.findAll(), HttpStatus.OK);
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
