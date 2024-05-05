package com.terabite.programming.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * ProgramDescription
 */
@Entity
@Table(name = "program_description")
public class ProgramDescription {

    @Id
    private Long programDescriptionId;

    private String body;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    @JsonIgnore
    private Program program;

    public ProgramDescription() {
    }

    public ProgramDescription(String body) {
        this.body = body;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getProgramDescriptionId() {
        return this.programDescriptionId;
    }

    public void setProgramDescriptionId(Long programDescriptionId) {
        this.programDescriptionId = programDescriptionId;
    }

    public Program getProgram() {
        return this.program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }



    
}
