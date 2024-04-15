package com.terabite.programming.repository;

import com.terabite.programming.model.RepCycleNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RepCycleNoteRepository extends JpaRepository<RepCycleNote, Integer> {
    Optional<List<RepCycleNote>> findRepCycleNotesByUser_Id(long userId);

    Optional<List<RepCycleNote>> findRepCycleNotesByRepCycle_RepCycleId(long repCycleId);
}
