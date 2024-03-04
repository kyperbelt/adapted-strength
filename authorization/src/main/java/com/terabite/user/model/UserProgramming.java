package com.terabite.user.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
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
    @JsonAlias("user_programming_id")
    private Long userProgrammingId;

    @JoinColumn(table = "program", name = "id", nullable = false)
    @ManyToOne
    @JsonAlias("user_info")
    private UserInformation userInfo;

    @JoinColumn(table = "user_information_table", nullable = false)
    @ManyToOne
    private Program program;

    @JoinTable(
        name = "user_workout_comments_table")
    @ManyToMany
    private List<ProgrammingComment> comments;

    public Long getId() {
        return userProgrammingId;
    }

    public UserInformation getUserInfo() {
        return userInfo;
    }

    public Program getProgram() {
        return program;
    }

    public Long getUserProgrammingId() {
        return userProgrammingId;
    }

    public List<ProgrammingComment> getComments() {
        return comments;
    }

    public void setUserProgrammingId(Long userMappingId) {
        this.userProgrammingId = userMappingId;
    }

    public void setComments(List<ProgrammingComment> comments) {
        this.comments = comments;
    }

    public void setId(Long userMappingId) {
        this.userProgrammingId = userMappingId;
    }

    public void setUserInfo(UserInformation userInfo) {
        this.userInfo = userInfo;
    }

    public void setProgram(Program program) {
        this.program = program;
    }   
}
