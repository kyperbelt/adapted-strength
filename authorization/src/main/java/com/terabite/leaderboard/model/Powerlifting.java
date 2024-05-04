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
@Table(name = "powerlifting")
public class Powerlifting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonAlias("weight_class")
    private String weightClass;

    @JsonAlias("gender")
    private char gender;

    @JsonAlias("squat")
    private double squat = 0.0;

    @JsonAlias("bench")
    private double bench = 0.0;

    @JsonAlias("deadlift")
    private double deadlift = 0.0;

    @JsonAlias("total")
    private double total;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getWeightClass() {
        return weightClass;
    }

    public void setWeightClass(final String weightClass) {
        this.weightClass = weightClass;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(final char gender) {
        this.gender = gender;
    }

    public double getSquat() {
        return squat;
    }

    public void setSquat(final double squat) {
        this.squat = squat;
    }

    public double getBench () {
        return bench;
    }

    public void setBench(final double bench) {
        this.bench = bench;
    }

    public double getDeadlift() {
        return deadlift;
    }

    public void setDeadlift(final double deadlift) {
        this.deadlift = deadlift;
    }

    public double getTotal() {
        return total;
    }
    public void setTotal() {
        this.total = squat + bench + deadlift;
    }
}
