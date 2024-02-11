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
    private long id;

    @NotBlank
    private String name;

    @ManyToOne
    @JoinColumn(name = "id", nullable = false)
    private Block block;

    @OneToMany(mappedBy = "week")
    private List<Day> days;

    public Week(String name, Block block, List<Day> days){
        this.name=name;
        this.block=block;
        this.days=days;
    }

    public Week(){
        
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public Block getBlock() {
        return block;
    }

    public void setBlock(Block block) {
        this.block = block;
    }
    
    public List<Day> getDays() {
        return days;
    }

    public void setDays(List<Day> days) {
        this.days = days;
    }
}
