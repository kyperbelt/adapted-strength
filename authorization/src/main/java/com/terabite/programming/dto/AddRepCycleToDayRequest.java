package com.terabite.programming.dto;

import com.terabite.programming.model.RepCycle;

/**
 * AddRepCycleToWeekRequest
 *
 * String name;
 * 
 * String equipment;
 * 
 * String numSets;
 * 
 * String numReps;
 * 
 * String weight;
 * 
 * String restTime;
 * 
 * String coachNotes;
 * 
 * long movementId;
 */
public record AddRepCycleToDayRequest(int dayId, String name, String equipment, String numSets, String numReps,
                String weight, String restTime, String coachNotes, long movementId) {

        public RepCycle RepCycleFromRequest() {
                return new RepCycle(name, equipment, numSets, numReps, weight, restTime, coachNotes, movementId);
        }
}
