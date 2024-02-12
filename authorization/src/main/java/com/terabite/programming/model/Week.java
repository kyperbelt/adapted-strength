package com.terabite.programming.model;

import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "week")
public class Week 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long weekId;

    @NotBlank
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn
    private List<Day> days;

    public Week(String name, List<Day> days){
        this.name=name;
        this.days=days;
    }

    public Week(){
        
    }

    public long getWeekId() {
        return weekId;
    }

    public void setWeekId(long id) {
        this.weekId = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public List<Day> getDays() {
        return days;
    }

    public void setDays(List<Day> days) {
        this.days = days;
    }
}
