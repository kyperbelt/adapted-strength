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
    @Column(name = "program_id", nullable = false)
    private long programId;
    
    @NotBlank
    private String name;

    @OneToMany(mappedBy = "program")
    private List<Block> blocks;

    public Program(String name, List<Block> blocks){
        this.name=name;
        this.blocks=blocks;
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

    public List<Block> getBlocks(){
        return this.blocks;
    }

    public void setBlocks(List<Block> blocks){
        this.blocks=blocks;
    }
}

