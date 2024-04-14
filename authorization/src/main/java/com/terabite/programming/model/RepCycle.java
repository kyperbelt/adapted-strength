package com.terabite.programming.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "rep_cycle")
public class RepCycle 
{
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long repCycleId;

    @NotBlank
    private String name;

    private String equipment;

    @JsonAlias("num_sets")
    private String numSets;

    @JsonAlias("num_reps")
    private String numReps;

    private String weight;

    @JsonAlias("rest_time")
    private String restTime;

    @JsonAlias("coach_notes")
    private String coachNotes;

    @JsonAlias("workout_order")
    private String workoutOrder;

    private long movementId;

    public RepCycle(String name, String equipment, String numSets, String numReps, String weight, String restTime, String coachNotes, String workoutOrder, long movementId){
        this.name=name;
        this.equipment=equipment;
        this.numSets=numSets;
        this.numReps=numReps;
        this.weight=weight;
        this.restTime=restTime;
        this.coachNotes=coachNotes;
        this.workoutOrder = workoutOrder;
        this.movementId=movementId;
    }

    public RepCycle(){
        
    }

    public long getRepCycleId() {
        return repCycleId;
    }

    public void setRepCycleId(long id) {
        this.repCycleId = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getNumSets() {
        return numSets;
    }

    public void setNumSets(String numSets) {
        this.numSets = numSets;
    }

    public String getNumReps() {
        return numReps;
    }

    public void setNumReps(String numReps) {
        this.numReps = numReps;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getRestTime() {
        return restTime;
    }

    public void setRestTime(String restTime) {
        this.restTime = restTime;
    }

    public String getCoachNotes() {
        return coachNotes;
    }

    public void setCoachNotes(String coachNotes) {
        this.coachNotes = coachNotes;
    }

    public long getMovementId() {
        return this.movementId;
    }

    public void setMovementId(long movementId) {
        this.movementId = movementId;
    }
    
    public String getWorkoutOrder() {
        return workoutOrder;
    }

    public void setWorkoutOrder(String workoutOrder) {
        this.workoutOrder = workoutOrder;
    }


}
