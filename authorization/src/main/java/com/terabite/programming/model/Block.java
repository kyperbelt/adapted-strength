package com.terabite.programming.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "program_block")
public class Block 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long blockId;

    @NotBlank
    @JsonAlias("block_name")
    private String blockName;

    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;
    
    @OneToMany(mappedBy = "program_block")
    private List<Week> programWeeks;

    public Block(String blockName, Program program, List<Week> programWeeks){
        this.blockName=blockName;
        this.program=program;
        this.programWeeks=programWeeks;
    }

    public Block(){

    }

    public String getName() {
        return blockName;
    }

    public void setName(String blockName) {
        this.blockName = blockName;
    }

    public long getId() {
        return blockId;
    }

    public void setId(long id) {
        this.blockId = id;
    }

    public List<Week> getProgramWeeks(){
        return this.programWeeks;
    }

    public void setProgramWeeks(List<Week> programWeeks){
        this.programWeeks=programWeeks;
    }

}
