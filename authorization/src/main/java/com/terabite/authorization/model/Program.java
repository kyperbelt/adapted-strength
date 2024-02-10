package com.terabite.authorization.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "program_table")
public class Program 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @NotBlank
    @JsonAlias("program_name")
    private String programName;

    @JsonAlias("block_Id")
    private List<Long> blockId;

    public long getId(){
        return this.id;
    }

    public void setId(long programId){
        this.id=programId;
    }

    public String getProgramName(){
        return this.programName;
    }

    public void setProgramName(String programName){
        this.programName=programName;
    }

    public List<Long> getBlockId(){
        return this.blockId;
    }

    public void setBlockId(List<Long> blockId){
        this.blockId=blockId;
    }

    /*
    public long getBlockTwoId(){
        return this.blockTwoId;
    }

    public void setBlockTwoId(long blockTwoId){
        this.id=blockTwoId;
    }
    public long getBlockThreeId(){
        return this.blockThreeId;
    }

    public void setBlockThreeId(long blockThreeId){
        this.id=blockThreeId;
    }
    */
}

