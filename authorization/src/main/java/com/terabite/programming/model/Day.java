package com.terabite.programming.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name= "day")
public class Day 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long dayId;

    @NotBlank
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonAlias("rep_cycles")
    @JoinColumn
    private List<RepCycle> repCycles;

    public Day(String name, List<RepCycle> repCycles){
        this.name=name;
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

    public List<RepCycle> getRepCycles(){
        return this.repCycles;
    }

    public void setRepCycles(List<RepCycle> repCycles){
        this.repCycles=repCycles;
    }

    public Day duplicate(){
        final Day newDay = new Day();
        newDay.setName(String.format("%s", this.getName()));
        List<RepCycle> newRepCycles = new ArrayList<>();
        for(RepCycle repCycle : this.getRepCycles()){
            newRepCycles.add(repCycle.duplicate());
        }
        newDay.setRepCycles(newRepCycles);
        return newDay;
    }

    @Override
    public String toString() {
        return String.format("Day [id=%d, name=%s, repCycles=%s]", dayId, name, repCycles);
    }
}
