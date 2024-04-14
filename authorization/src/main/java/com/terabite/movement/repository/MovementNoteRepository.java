package com.terabite.movement.repository;

import com.terabite.movement.model.MovementNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovementNoteRepository extends JpaRepository<MovementNote, Integer> {
}
