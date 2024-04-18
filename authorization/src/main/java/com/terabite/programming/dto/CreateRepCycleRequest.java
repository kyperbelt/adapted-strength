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

<p>
payload: 
{
    "repCycleName": "string",
    "equipment": "string",
    "numSets": "string",
    "numReps": "string",
    "weight": "string",
    "restTime": "string",
    "coachNotes": "string",
    "workoutOrder": "string",
    "movementId": 0
}
<p>
 
 */
public record CreateRepCycleRequest(String repCycleName, String equipment, String numSets, String numReps, String weight, String restTime, String coachNotes, String workoutOrder, long movementId) {
        
}
