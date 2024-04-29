package com.terabite.programming.controller;


import com.terabite.programming.dto.RepCycleNoteRequest;
import com.terabite.programming.dto.RepCycleNoteResponse;
import com.terabite.programming.model.RepCycle;
import com.terabite.programming.model.RepCycleNote;
import com.terabite.programming.repository.RepCycleNoteRepository;
import com.terabite.programming.repository.RepCycleRepository;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/programming/note")
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

    /**
     * Gets all notes for all users and rep-cycles. Returns as a JSON Array
     *
     * @return list of all rep-cycle notes
     */
    @GetMapping("/notes")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> getNotes() {
        List<RepCycleNote> notes = noteRepository.findAll();

        // Converting for serialization
        List<RepCycleNoteResponse> response = notes.stream().map(RepCycleNoteResponse::new).toList();
        if (notes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> getNoteById(@PathVariable int id) {
        RepCycleNote note = noteRepository.findById(id).orElse(null);
        if (note == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new RepCycleNoteResponse(note));
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> getNotesByUserId(@PathVariable int id) {
        List<RepCycleNote> notes = noteRepository.findRepCycleNotesByUser_Id(id).orElse(null);

        return getResponseEntity(notes);
    }

    /**
     * Method for converting notes into serializable objects for a ResponseEntity
     *
     * @param notes a list of notes returned from some repository action
     * @return the corresponding ResponseEntity with a serializable version of RepCycleNote
     */
    private ResponseEntity<?> getResponseEntity(List<RepCycleNote> notes) {
        if (notes != null) {
            List<RepCycleNoteResponse> response = notes.stream().map(RepCycleNoteResponse::new).toList();
            if (notes.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/rep_cycle/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> getNotesByRepCycleId(@PathVariable long id) {
        List<RepCycleNote> notes = noteRepository.findRepCycleNotesByRepCycle_RepCycleId(id).orElse(null);

        return getResponseEntity(notes);
    }

    /**
     * Creates a Rep-cycle note for given user ID and repCycle ID
     *
     * @param noteRequest the DTO for passing in user_id, rep_cycle_id, and the note's string
     * @return the ResponseEntity with the newly created and saved RepCycleNote
     */
    @PostMapping("/notes")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> createNote(@RequestBody RepCycleNoteRequest noteRequest) {
        log.info(noteRequest.toString());
        RepCycleNote note = new RepCycleNote();

        RepCycle repCycle = repCycleRepository.findById(noteRequest.rep_cycle_id()).orElse(null);
        UserInformation userInformation = userRepository.findById(noteRequest.user_id()).orElse(null);

        if (repCycle == null || userInformation == null) {
            return ResponseEntity.badRequest().build();
        }

        note.setRepCycle(repCycle);
        note.setUser(userInformation);
        note.setNote(noteRequest.note());

        log.info(note.toString());
        noteRepository.save(note);

        // Converting for serialization
        return ResponseEntity.ok(new RepCycleNoteResponse(note));
    }

    /**
     * Barebones put for updating notes. Must pass in a full RepCycleNote in JSON to update
     * Not technically complete - purely for completed CRUD
     *
     * @param note the exact RepCycleNote object needed to update
     * @return the ResponseEntity containing the updated RepCycleNote
     */
    @PutMapping("/notes")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> updateNote(@RequestBody RepCycleNote note) {
        noteRepository.save(note);
        return ResponseEntity.ok(new RepCycleNoteResponse(note));
    }

    /**
     * Deletes a note by its unique id. Needs error checking
     *
     * @param id the unique id of the note to delete
     * @return the ResponseEntity with a 200 OK status
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_COACH', 'ROLE_ADMIN')")
    public ResponseEntity<?> deleteNote(@PathVariable int id) {

        try {
            noteRepository.deleteById(id);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
