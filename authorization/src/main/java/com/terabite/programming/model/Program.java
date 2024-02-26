package com.terabite.programming.model;
import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "program")
public class Program 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long programId;
    
    @NotBlank
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn
    private List<Week> weeks;

    public Program(String name, List<Week> blocks){
        this.name=name;
        this.weeks=blocks;
    }

    public Program(){

    }

    public long getProgramId(){
        return this.programId;
    }

    public void setProgramId(long id){
        this.programId=id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name=name;
    }

    public List<Week> getWeeks(){
        return this.weeks;
    }

    public void setWeeks(List<Week> weeks){
        this.weeks=weeks;
    }
}

