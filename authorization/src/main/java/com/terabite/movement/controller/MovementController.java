package com.terabite.movement.controller;

import com.terabite.movement.model.Movement;
import com.terabite.movement.repository.MovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/mov")
public class MovementController {
    private final MovementRepository movementRepository;

    public MovementController(MovementRepository movementRepository)
    {
        this.movementRepository = movementRepository;
    }

    @GetMapping("/movements")
    public ResponseEntity<List<Movement>> getMovements(@RequestParam(required = false) String title)
    {
        List<Movement> movements = new ArrayList<Movement>();
        if(title == null)
        {
            movementRepository.findAll().forEach(movements::add);
        }
        else
        {
            movementRepository.findByTitleContaining(title).forEach(movements::add);
        }

        if(movements.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(movements, HttpStatus.OK);

    }

    @GetMapping("/movements/{id}")
    public ResponseEntity<Movement> getMovementById(@PathVariable("id") long id)
    {
        Movement movement = movementRepository.findById(id);
        if(movement == null)
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movement, HttpStatus.OK);
    }

    @PostMapping("/movements")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Movement> createMovement(@RequestBody final Movement movement) {
        movementRepository.save(movement);
        return new ResponseEntity<>(movement, HttpStatus.OK);
    }

    @PutMapping("/movements/{id}")
    public ResponseEntity<Movement> updateMovement(@PathVariable("id") long id, @RequestBody Movement movement)
    {
        Movement foundMovement = movementRepository.findById(id);
        if(foundMovement == null)
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        foundMovement.setTitle(movement.getTitle() != null ? movement.getTitle() : foundMovement.getTitle());
        foundMovement.setDescription(movement.getDescription() != null ? movement.getDescription() : foundMovement.getDescription());
        foundMovement.setLink(movement.getLink() != null ? movement.getLink() : foundMovement.getLink());

        movementRepository.save(foundMovement);
        return new ResponseEntity<>(foundMovement, HttpStatus.CREATED);
    }


    @DeleteMapping("/movements/{id}")
    public ResponseEntity<HttpStatus> deleteMovementById(@PathVariable("id") long id)
    {
        movementRepository.deleteById((int) id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/movements")
    public ResponseEntity<Movement> deleteAllMovements()
    {
        movementRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
