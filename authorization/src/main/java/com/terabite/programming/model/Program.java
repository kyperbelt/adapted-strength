package com.terabite.programming.model;

import java.util.ArrayList;
import java.util.List;

import com.google.api.client.util.Lists;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "program")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private long programId;

    @NotBlank
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn
    private List<Week> weeks;

    @OneToOne(mappedBy = "program", cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = false)
    private ProgramDescription description;

    public Program(String name, List<Week> weeks) {
        this.name = name;
        this.weeks = weeks;
    }

    public Program() {

    }

    public ProgramDescription getDescription() {
        return this.description;
    }

    public void setDescription(ProgramDescription description) {
        this.description = description;
        description.setProgram(this);
    }


    public long getProgramId() {
        return this.programId;
    }

    public void setProgramId(long id) {
        this.programId = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Week> getWeeks() {
        return this.weeks;
    }

    public void setWeeks(List<Week> weeks) {
        this.weeks = weeks;
    }

    public Program duplicate() {
        Program newProgram = new Program();
        List<Week> newWeeks = new ArrayList<>();
        for (Week week : this.weeks) {
            newWeeks.add(week.duplicate());
        }
        newProgram.setWeeks(newWeeks);
        newProgram.setName(String.format("%s", this.name));
        newProgram.setDescription(new ProgramDescription(this.description.getBody()));
        return newProgram;
    }
    
}
