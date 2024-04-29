package com.terabite.programming.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.terabite.user.model.UserInformation;
import jakarta.persistence.*;

@Entity
@Table(name = "repcycle_note_table")
public class RepCycleNote {
    String note;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonAlias("rep_cycle")
    private RepCycle repCycle;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonAlias("user")
    private UserInformation user;

    @Override
    public String toString() {
        return "repCycleNote{" +
                "id=" + id +
                ", repCycle=" + repCycle +
                ", user=" + user +
                ", note='" + note + '\'' +
                '}';
    }

    public long getId() {
        return id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public RepCycle getRepCycle() {
        return repCycle;
    }

    public void setRepCycle(RepCycle repCycle) {
        this.repCycle = repCycle;
    }

    public UserInformation getUser() {
        return user;
    }

    public void setUser(UserInformation user) {
        this.user = user;
    }
}