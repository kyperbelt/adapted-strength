package com.terabite.authorization.service;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;

//Not sure we are using this implementation yet

@Entity
@Table(name = "program_block_table")
public class ProgramBlock 
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @JsonAlias("week_Id")
    private List<Long> weekId;

    /* 
    @JsonAlias("week_two_Id")
    private long weekTwoId;

    @JsonAlias("week_three_Id")
    private long weekThreeId;

    @JsonAlias("week_four_Id")
    private long weekFourId;
    */

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Long> getWeekId() {
        return weekId;
    }

    public void setWeekId(List<Long> weekId) {
        this.weekId = weekId;
    }

    /* 
    public long getWeekTwoId() {
        return weekTwoId;
    }

    public void setWeekTwoId(long weekTwoId) {
        this.weekTwoId = weekTwoId;
    }

    public long getWeekThreeId() {
        return weekThreeId;
    }

    public void setWeekThreeId(long weekThreeId) {
        this.weekThreeId = weekThreeId;
    }

    public long getWeekFourId() {
        return weekFourId;
    }

    public void setWeekFourId(long weekFourId) {
        this.weekFourId = weekFourId;
    }*/
}
