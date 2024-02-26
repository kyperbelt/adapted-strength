package com.terabite.user.model;

import jakarta.persistence.*;
import java.io.Serializable;

import com.terabite.programming.model.Program;

@Entity
@Table(name = "user_programming_mapping")
@SecondaryTables({
    @SecondaryTable(name = "user_information_table"),
    @SecondaryTable(name = "program")
})

public class UserProgramming implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userMappingId;

    @JoinColumn(table = "program", name = "id", nullable = false)
    @ManyToOne
    private UserInformation userInfo;

    @JoinColumn(table = "user_information_table", nullable = false)
    @ManyToOne
    private Program program;

    public Long getId() {
        return userMappingId;
    }

    public UserInformation getUserInfo() {
        return userInfo;
    }

    public Program getProgram() {
        return program;
    }

    public void setId(Long userMappingId) {
        this.userMappingId = userMappingId;
    }

    public void setUserInfo(UserInformation userInfo) {
        this.userInfo = userInfo;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    
}
