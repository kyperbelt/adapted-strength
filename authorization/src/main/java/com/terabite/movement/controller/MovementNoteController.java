package com.terabite.movement.controller;

import com.terabite.movement.repository.MovementNoteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/movement/note/")
public class MovementNoteController {
    private final MovementNoteRepository noteRepository;

    public MovementNoteController(MovementNoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // Get
    @GetMapping("/notes")
    public ResponseEntity<?> getNotes() {
        return ResponseEntity.ok(noteRepository.findAll());
    }

    // Post

    // Put

    // Delete
}
