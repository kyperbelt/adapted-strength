package com.terabite.authorization.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "forgot_password_table")
public class ForgotPasswordToken {

    private static final int HOURS_UNTIL_EXPIRATION = 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    private String token;

    @JsonIgnore
    @OneToOne(mappedBy = "forgotPasswordToken")
    private Login login;
    
    private LocalDateTime expiryDate;

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime currentDateTime) {
        this.expiryDate = currentDateTime.plusHours(HOURS_UNTIL_EXPIRATION);
    }


}
