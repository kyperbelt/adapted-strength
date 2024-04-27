package com.terabite.leaderboard.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "bench")
public class Bench {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonAlias("name")
    private String name;

    @JsonAlias("gender")
    private char gender;

    @JsonAlias("weight_class")
    private String weightClass;

    @Column(name = "weight")
    private float weight;

    public Bench() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWeightClass() {
        return weightClass;
    }

    public void setWeightClass(String weightClass) {
        this.weightClass = weightClass;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }
}
