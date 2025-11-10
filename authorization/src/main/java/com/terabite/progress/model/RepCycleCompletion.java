package com.terabite.progress.model;

import com.terabite.user.model.UserInformation;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rep_cycle_completion")
public class RepCycleCompletion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserInformation user;
    
    @Column(name = "rep_cycle_id", nullable = false)
    private Long repCycleId;
    
    @Column(name = "user_programming_id", nullable = false)
    private Long userProgrammingId;
    
    @Column(name = "completed_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date completedAt;
    
    @Column(name = "last_modified_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedAt;
    
    @Column(name = "active", nullable = false)
    private Boolean active = true;
    
    public RepCycleCompletion() {
    }
    
    public RepCycleCompletion(UserInformation user, Long repCycleId, Long userProgrammingId) {
        this.user = user;
        this.repCycleId = repCycleId;
        this.userProgrammingId = userProgrammingId;
        this.completedAt = new Date();
        this.lastModifiedAt = new Date();
        this.active = true;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public UserInformation getUser() {
        return user;
    }
    
    public void setUser(UserInformation user) {
        this.user = user;
    }
    
    public Long getRepCycleId() {
        return repCycleId;
    }
    
    public void setRepCycleId(Long repCycleId) {
        this.repCycleId = repCycleId;
    }
    
    public Long getUserProgrammingId() {
        return userProgrammingId;
    }
    
    public void setUserProgrammingId(Long userProgrammingId) {
        this.userProgrammingId = userProgrammingId;
    }
    
    public Date getCompletedAt() {
        return completedAt;
    }
    
    public void setCompletedAt(Date completedAt) {
        this.completedAt = completedAt;
    }
    
    public Date getLastModifiedAt() {
        return lastModifiedAt;
    }
    
    public void setLastModifiedAt(Date lastModifiedAt) {
        this.lastModifiedAt = lastModifiedAt;
    }
    
    public Boolean getActive() {
        return active;
    }
    
    public void setActive(Boolean active) {
        this.active = active;
    }
}
