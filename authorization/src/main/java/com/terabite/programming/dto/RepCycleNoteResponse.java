package com.terabite.programming.dto;

import com.terabite.programming.model.RepCycle;
import com.terabite.user.model.UserInformation;

public class RepCycleNoteResponse {
    private long id;
    private RepCycle repCycle;
    private UserInformation user;
    private String note;

    public RepCycleNoteResponse(long id, RepCycle repCycle, UserInformation user, String note) {
        this.id = id;
        this.repCycle = repCycle;
        this.user = user;
        this.note = note;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
