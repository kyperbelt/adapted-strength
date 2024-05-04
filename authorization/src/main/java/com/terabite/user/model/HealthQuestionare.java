package com.terabite.user.model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;


/**
 * HealthQuestionare
 */
@Entity
@Table(name = "health_questionare")
public class HealthQuestionare {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonAlias("id")
    private long id;

    // this has to be unique
    @Column(name = "email", nullable = false , unique = true)
    private String email;
    
    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "weight", nullable = false)
    private int weight;

    @Column(name = "height", nullable = false)
    private int height;

    @Lob
    @Column(name = "fitness_goals", nullable = false)
    private String fitnessGoals;

    @Lob
    @Column(name = "medical_concerns", nullable = false)
    private String medicalConcerns;

    @Lob
    @Column(name = "exercise_frequency", nullable = false)
    private String exerciseFrequency;

    public HealthQuestionare() {
    }

    public HealthQuestionare(String email, int age, int weight, int height, String fitnessGoals, String medicalConcerns, String exerciseFrequency) {
        this.email = email;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.fitnessGoals = fitnessGoals;
        this.medicalConcerns = medicalConcerns;
        this.exerciseFrequency = exerciseFrequency;
    }
    
    public long getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public int getAge() {
        return this.age;
    }

    public int getWeight() {
        return this.weight;
    }

    public int getHeight() {
        return this.height;
    }

    public String getFitnessGoals() {
        return this.fitnessGoals;
    }

    public String getMedicalConcerns() {
        return this.medicalConcerns;
    }

    public String getExerciseFrequency() {
        return this.exerciseFrequency;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }


    public void setHeight(int height) {
        this.height = height;
    }

    public void setFitnessGoals(String fitnessGoals) {
        this.fitnessGoals = fitnessGoals;
    }

    public void setMedicalConcerns(String medicalConcerns) {
        this.medicalConcerns = medicalConcerns;
    }

    public void setExerciseFrequency(String exerciseFrequency) {
        this.exerciseFrequency = exerciseFrequency;
    }
    
}
