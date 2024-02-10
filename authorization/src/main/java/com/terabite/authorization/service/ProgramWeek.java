package com.terabite.authorization.service;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "program_week_table")
public class ProgramWeek 
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

    public ProgramWeek(String weekName, String weekData){
        this.weekData=weekData;
        this.weekName=weekName;
    }

    public ProgramWeek(){
        
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
    
    public String getWeekName() {
        return weekName;
    }

    public void setWeekName(String weekName) {
        this.weekName = weekName;
    }
}
