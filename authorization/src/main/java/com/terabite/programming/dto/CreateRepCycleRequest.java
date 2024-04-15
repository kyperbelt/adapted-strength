package com.terabite.programming.dto;

import java.util.Optional;

/**
 * CreateRepCycleRequest
 *
    long repCycleId;

    String name;

    String equipment;

    String numSets;

    String numReps;

    String weight;

    String restTime;

    String coachNotes;

    String workoutOrder;

    long movementId;
 */
public record CreateRepCycleRequest(String repCycleName, String equipment, String numSets, String numReps, String weight, String restTime, String coachNotes, String workoutOrder, long movementId) {
        
}
