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

    // builder pattern
    public RepCycle withRepCycleId(long id) {
        this.repCycleId = id;
        return this;
    }

    public RepCycle withName(String name) {
        this.name = name;
        return this;
    }

    public RepCycle withEquipment(String equipment) {
        this.equipment = equipment;
        return this;
    }

    public RepCycle withNumSets(String numSets) {
        this.numSets = numSets;
        return this;
    }

    public RepCycle withNumReps(String numReps) {
        this.numReps = numReps;
        return this;
    }

    public RepCycle withWeight(String weight) {
        this.weight = weight;
        return this;
    }

    public RepCycle withRestTime(String restTime) {
        this.restTime = restTime;
        return this;
    }

    public RepCycle withCoachNotes(String coachNotes) {
        this.coachNotes = coachNotes;
        return this;
    }

    public RepCycle withWorkoutOrder(String workoutOrder) {
        this.workoutOrder = workoutOrder;
        return this;
    }

    public RepCycle withMovementId(long movementId) {
        this.movementId = movementId;
        return this;
    }


<<<<<<< HEAD
=======
    public RepCycle duplicate(){
        return new RepCycle()
            .withName(this.getName())
            .withEquipment(this.getEquipment())
            .withNumSets(this.getNumSets())
            .withNumReps(this.getNumReps())
            .withWeight(this.getWeight())
            .withRestTime(this.getRestTime())
            .withCoachNotes(this.getCoachNotes())
            .withWorkoutOrder(this.getWorkoutOrder())
            .withMovementId(this.getMovementId());
    }

>>>>>>> main
    @Override
    public String toString() {
        return "RepCycle{" +
                "repCycleId=" + repCycleId +
                ", name='" + name + '\'' +
                ", equipment='" + equipment + '\'' +
                ", numSets='" + numSets + '\'' +
                ", numReps='" + numReps + '\'' +
                ", weight='" + weight + '\'' +
                ", restTime='" + restTime + '\'' +
                ", coachNotes='" + coachNotes + '\'' +
                ", movementId=" + movementId +
                '}';
    }
}
