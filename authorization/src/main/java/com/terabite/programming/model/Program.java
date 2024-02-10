package com.terabite.programming.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "program")
public class Program 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long programID;
    
    @NotBlank
    @JsonAlias("program_name")
    private String programName;

    @OneToMany(mappedBy = "program")
    private List<Block> programBlocks;

    public Program(String programName, List<Block> programBlocks){
        this.programName=programName;
        this.programBlocks=programBlocks;
    }

    public Program(){

    }

    public long getId(){
        return this.programID;
    }

    public void setId(long programId){
        this.programID=programId;
    }

    public String getName(){
        return this.programName;
    }

    public void setName(String programName){
        this.programName=programName;
    }

    public List<Block> getProgramBlocks(){
        return this.programBlocks;
    }

    public void setProgramBlocks(List<Block> programBlocks){
        this.programBlocks=programBlocks;
    }
}

