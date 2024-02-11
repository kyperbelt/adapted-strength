package com.terabite.programming.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.terabite.programming.model.RepCycle;
import com.terabite.programming.repository.RepCycleRepository;

public class RepCycleService {

    RepCycleRepository repCycleRepository;

    public RepCycleService(RepCycleRepository repCycleRepository){
        this.repCycleRepository=repCycleRepository;
    }

    public ResponseEntity<?> createNewRepCycle(RepCycle repCycle) {
        repCycleRepository.save(repCycle);
        return new ResponseEntity<>(repCycle, HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateRepCycle(RepCycle repCycle) {
        if(repCycleRepository.findById(repCycle.getId()).isEmpty()){
            return new ResponseEntity<>(repCycle, HttpStatus.NOT_FOUND);
        }
        else{
            repCycleRepository.save(repCycle);
            return new ResponseEntity<>(repCycle, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<?> getRepCycle(RepCycle repCycle) {
        if(repCycleRepository.findById(repCycle.getId()).isEmpty()){
            return new ResponseEntity<>(repCycle, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(repCycleRepository.findOneById(repCycle.getId()), HttpStatus.FOUND);
        }
    }

    public ResponseEntity<?> deleteRepCycle(RepCycle repCycle) {
        if(repCycleRepository.findById(repCycle.getId()).isEmpty()){
            return new ResponseEntity<>(repCycle, HttpStatus.NOT_FOUND);
        }
        else{
            repCycleRepository.delete(repCycle);
            return new ResponseEntity<>(repCycleRepository.findOneById(repCycle.getId()), HttpStatus.FOUND);
        }
    }
    
}
