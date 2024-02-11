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
    private long id;

    @NotBlank
    private String name;

    @ManyToOne
    @JoinColumn(name = "id")
    private Program program;
    
    @OneToMany(mappedBy = "block")
    private List<Week> weeks;

    public Block(String name, Program program, List<Week> weeks){
        this.name=name;
        this.program=program;
        this.weeks=weeks;
    }

    public Block(){

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
