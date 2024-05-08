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
@Table(name = "olympic")
public class Olympic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonAlias("name")
    private String name;

    @JsonAlias("weight_class")
    private String weightClass;

    @JsonAlias("gender")
    private char gender;

    @JsonAlias("snatch")
    private double snatch = 0.0;

    @JsonAlias("clean_jerk")
    private double cleanJerk = 0.0;

    @JsonAlias("total")
    private double total;

    public Olympic() {
    }

    public Long getId() {
        return id;
    }
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getWeightClass() {
        return weightClass;
    }

    public void setWeightClass(String weightClass) {
        this.weightClass = weightClass;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public double getSnatch() {
        return snatch;
    }

    public void setSnatch(double snatch) {
        this.snatch = snatch;
    }

    public double getCleanJerk() {
        return cleanJerk;
    }

    public void setCleanJerk(double cleanJerk) {
        this.cleanJerk = cleanJerk;
    }

    public double getTotal() {
        return total;
    }
    public void setTotal() {
        this.total = snatch + cleanJerk;
    }
}
