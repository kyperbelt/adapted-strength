package com.terabite.programming.controller;


import com.terabite.programming.dto.RepCycleNoteRequest;
import com.terabite.programming.model.RepCycle;
import com.terabite.programming.model.RepCycleNote;
import com.terabite.programming.repository.RepCycleNoteRepository;
import com.terabite.programming.repository.RepCycleRepository;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/programming/note")
@Transactional
public class RepCycleNoteController {
    private static final Logger log = LoggerFactory.getLogger(SubscriptionService.class);

    private final RepCycleNoteRepository noteRepository;
    private final RepCycleRepository repCycleRepository;
    private final UserRepository userRepository;

    public RepCycleNoteController(RepCycleNoteRepository noteRepository, RepCycleRepository repCycleRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.repCycleRepository = repCycleRepository;
        this.userRepository = userRepository;
    }

    // Get
    @GetMapping("/notes")
    public ResponseEntity<?> getNotes() {
        List<RepCycleNote> notes = noteRepository.findAll();
        if (notes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(notes);
    }

    // Post
    @PostMapping("/notes")
    public ResponseEntity<?> createNote(@RequestBody RepCycleNoteRequest noteRequest) {
        log.info(noteRequest.toString());
        RepCycleNote note = new RepCycleNote();


        // God as my witness
        RepCycle repCycle = repCycleRepository.findById(noteRequest.rep_cycle_id()).orElse(null);
        UserInformation userInformation = userRepository.findById(noteRequest.user_id()).orElse(null);

        note.setRepCycle(repCycle);
        note.setUser(userInformation);
        note.setNote(noteRequest.note());

        log.info(note.toString());
        noteRepository.save(note);
        return ResponseEntity.ok(note);
    }

    // Put
    @PutMapping("/notes")
    public ResponseEntity<?> updateNote(@RequestBody RepCycleNote note) {
        return ResponseEntity.ok(noteRepository.save(note));
    }

    // Delete
    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable int id) {
        noteRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
