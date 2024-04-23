package com.terabite.programming.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.programming.model.RepCycle;
import com.terabite.programming.repository.RepCycleRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RepCycleService {

    private static final Logger log = LoggerFactory.getLogger(RepCycleService.class);
    RepCycleRepository repCycleRepository;

    public RepCycleService(RepCycleRepository repCycleRepository){
        this.repCycleRepository=repCycleRepository;
    }

    public ResponseEntity<?> createNewRepCycle(RepCycle repCycle) {
        repCycleRepository.save(repCycle);
        return new ResponseEntity<>(repCycle, HttpStatus.OK);
    }

    public ResponseEntity<?> updateRepCycle(RepCycle repCycle) {
        if(repCycleRepository.findById(repCycle.getRepCycleId()).isEmpty()){
            log.error("RepCycle not found {}", repCycle);
            return new ResponseEntity<>(repCycle, HttpStatus.NOT_FOUND);
        }
        else{
            repCycleRepository.save(repCycle);
            return new ResponseEntity<>(repCycle, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getRepCycle(RepCycle repCycle) {
        if(repCycleRepository.findById(repCycle.getRepCycleId()).isEmpty()){
            log.error("RepCycle not found {}", repCycle);
            return new ResponseEntity<>(repCycle, HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(repCycleRepository.findOneByRepCycleId(repCycle.getRepCycleId()), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> getAllRepCycles() {
        return new ResponseEntity<>(repCycleRepository.findAll(), HttpStatus.OK);
    }

    public RepCycle getRepCycleById(long id){
        return repCycleRepository.findOneByRepCycleId(id);
    }

    public ResponseEntity<?> deleteRepCycle(RepCycle repCycle) {
        if(repCycleRepository.findById(repCycle.getRepCycleId()).isEmpty()){
            log.error("RepCycle not found {}", repCycle);
            return new ResponseEntity<>(repCycle, HttpStatus.NOT_FOUND);
        }
        else{
            repCycleRepository.delete(repCycle);
            return new ResponseEntity<>(repCycle, HttpStatus.OK);
        }
    }
    
}
