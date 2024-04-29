package com.terabite.user.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user_programming_mapping")

public class UserProgramming implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonAlias("user_programming_id")
    private Long userProgrammingId;

    @ManyToOne
    // @JsonAlias("user_info")
    @JsonIgnore
    private UserInformation userInfo;

    @JoinTable(name = "user_workout_comments_table")

    @JoinTable(name = "user_workout_comments_table")
    @ManyToMany
    private List<ProgrammingComment> comments;

    @JsonAlias("assigned_program_id")
    private long assignedProgramId;

    private Date startDate;


    private int startWeek;

    public int getStartWeek() {
        return startWeek;
    }

    public void setStartWeek(int startWeek) {
        this.startWeek = startWeek;
    }


    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getStartDate() {
        return startDate;
    }
    

    @JsonAlias("assigned_program_id")
    private long assignedProgramId;

    private Date startDate;

    private int currentWeek;



    public Long getId() {
        return userProgrammingId;
    }

    public void setAssignedProgramId(long assignedProgramId) {
        this.assignedProgramId = assignedProgramId;
    }

    public long getAssignedProgramId() {
        return assignedProgramId;
    }

    public void setAssignedProgramId(long assignedProgramId) {
        this.assignedProgramId = assignedProgramId;
    }

    public long getAssignedProgramId() {
        return assignedProgramId;
    }

    public UserInformation getUserInfo() {
        return userInfo;
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
    }
}
