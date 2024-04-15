package com.terabite.programming.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.terabite.movement.model.Movement;
import com.terabite.user.model.UserInformation;
import jakarta.persistence.*;

@Entity
@Table(name = "repcycle_note_table")
public class RepCycleNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JsonAlias("rep_cycle")
    private RepCycle repCycle;

    @ManyToOne
    @JsonAlias("user")
    private UserInformation user;

    String note;

    @Override
    public String toString() {
        return "repCycleNote{" +
                "id=" + id +
                ", repCycle=" + repCycle +
                ", user=" + user +
                ", note='" + note + '\'' +
                '}';
    }

    public void setRepCycle(RepCycle repCycle) {
        this.repCycle = repCycle;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setUser(UserInformation user) {
        this.user = user;
    }
}