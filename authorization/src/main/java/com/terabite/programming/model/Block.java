package com.terabite.programming.model;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "block")
public class Block
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long blockId;

    @NotBlank
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn
    private List<Week> weeks;

    public Block(String name, List<Week> weeks){
        this.name=name;
        this.weeks=weeks;
    }

    public Block(){

    }
    
    public long getBlockId() {
        return blockId;
    }

    public void setBlockId(long id) {
        this.blockId = id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Week> getWeeks(){
        return this.weeks;
    }

    public void setWeeks(List<Week> weeks){
        this.weeks=weeks;
    }

}
