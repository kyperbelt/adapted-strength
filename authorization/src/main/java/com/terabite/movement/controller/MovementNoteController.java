package com.terabite.movement.controller;

import com.terabite.movement.model.MovementNote;
import com.terabite.movement.repository.MovementNoteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/notes")
    public ResponseEntity<?> createNote(@RequestBody MovementNote note) {
        return ResponseEntity.ok(noteRepository.save(note));
    }

    // Put
    @PutMapping("/notes")
    public ResponseEntity<?> updateNote(@RequestBody MovementNote note) {
        return ResponseEntity.ok(noteRepository.save(note));
    }

    // Delete
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable int id) {
        noteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
