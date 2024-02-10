package com.terabite.programming.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "program_week")
public class Week 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank
    @JsonAlias("week_name")
    private String weekName;

    @NotBlank
    @JsonAlias("week_data")
    private String weekData;

    @ManyToOne
    @JoinColumn(name = "block_id", nullable = false)
    private Block programBlock;

    public Week(String weekName, String weekData){
        this.weekData=weekData;
        this.weekName=weekName;
    }

    public Week(){
        
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getWeekData() {
        return weekData;
    }

    public void setWeekData(String weekData) {
        this.weekData = weekData;
    }    
    
    public String getName() {
        return weekName;
    }

    public void setName(String weekName) {
        this.weekName = weekName;
    }
}
