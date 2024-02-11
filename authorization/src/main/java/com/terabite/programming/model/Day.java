package com.terabite.programming.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name= "day")
public class Day 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "day_id", nullable = false)
    private long dayId;

    @NotBlank
    private String name;

    @ManyToOne
    @JoinColumn(name = "id")
    private Week week;

    @OneToMany(mappedBy = "day")
    private List<RepCycle> repCycles;

    public Day(String name, Week week, List<RepCycle> repCycles){
        this.name=name;
        this.week=week;
        this.repCycles=repCycles;
    }

    public Day(){

    }

    public long getDayId() {
        return dayId;
    }

    public void setDayId(long id) {
        this.dayId = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public Week getWeek() {
        return week;
    }

    public void setWeek(Week week) {
        this.week = week;
    }

    public List<RepCycle> getRepCycles(){
        return this.repCycles;
    }

    public void setRepCycles(List<RepCycle> repCycles){
        this.repCycles=repCycles;
    }
}
