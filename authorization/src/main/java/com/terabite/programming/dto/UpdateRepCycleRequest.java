package com.terabite.programming.dto;

import java.util.Optional;

/**
 * CreateRepCycleRequest
 *
<<<<<<< HEAD
    long repCycleId;

    String name;
=======
    long id;

    String repCycleName;
>>>>>>> main

    String equipment;

    String numSets;

    String numReps;

    String weight;

    String restTime;

    String coachNotes;

    String workoutOrder;

    long movementId;
 */
/**
 * UpdateRepCycleRequest
 */
public record UpdateRepCycleRequest(long id, Optional<String> repCycleName, Optional<String> equipment, Optional<String> numSets, Optional<String> numReps, Optional<String> weight, Optional<String> restTime, Optional<String> coachNotes, Optional<String> workoutOrder, Optional<Long> movementId) {

}
