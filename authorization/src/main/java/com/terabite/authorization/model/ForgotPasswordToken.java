package com.terabite.authorization.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "forgot_password_table")
public class ForgotPasswordToken {
    private String token;
    
    private LocalDateTime createdAt;

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


}
