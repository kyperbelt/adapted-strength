package com.terabite.movement.controller;

import com.terabite.common.dto.Payload;
import com.terabite.movement.model.Movement;
import com.terabite.movement.repository.MovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/movement")
public class MovementController {
    private final MovementRepository movementRepository;

    public MovementController(MovementRepository movementRepository)
    {
        this.movementRepository = movementRepository;
    }

    @GetMapping("/movements")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN', 'ROLE_USER', 'ROLE_NO_SUBSCRIPTION', 'ROLE_BASE_CLIENT', 'ROLE_SPECIFIC_CLIENT')")
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

        return new ResponseEntity<>(movements, HttpStatus.OK);

    }

    @GetMapping("/movements/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN', 'ROLE_NO_SUBSCRIPTION', 'ROLE_BASE_CLIENT', 'ROLE_SPECIFIC_CLIENT')")
    public ResponseEntity<?> getMovementById(@PathVariable("id") long id)
    {
        Movement movement = movementRepository.findById(id);
        if(movement == null)
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Payload.of("Movement not found."));
        }
        return new ResponseEntity<>(movement, HttpStatus.OK);
    }

    @PostMapping("/movements")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> createMovement(@RequestBody final Movement movement) {
        movementRepository.save(movement);
        return new ResponseEntity<>(movement, HttpStatus.OK);
    }

    @PutMapping("/movements/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> updateMovement(@PathVariable("id") long id, @RequestBody Movement movement)
    {
        Movement foundMovement = movementRepository.findById(id);
        if(foundMovement == null)
        {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Payload.of("Movement not found."));
        }

        foundMovement.setTitle(movement.getTitle() != null ? movement.getTitle() : foundMovement.getTitle());
        foundMovement.setDescription(movement.getDescription() != null ? movement.getDescription() : foundMovement.getDescription());
        foundMovement.setLink(movement.getLink() != null ? movement.getLink() : foundMovement.getLink());

        movementRepository.save(foundMovement);
        return new ResponseEntity<>(foundMovement, HttpStatus.OK);
    }


    @DeleteMapping("/movements/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> deleteMovementById(@PathVariable("id") long id)
    {
        movementRepository.deleteById((int) id);
        return ResponseEntity.status(HttpStatus.OK).body(Payload.of("Movement deleted."));
    }

    // TODO: Do we need to delete all movements?
    @DeleteMapping("/movements")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAllMovements()
    {
        movementRepository.deleteAll();
        return ResponseEntity.status(HttpStatus.OK).body(Payload.of("All movements deleted."));
    }
}
