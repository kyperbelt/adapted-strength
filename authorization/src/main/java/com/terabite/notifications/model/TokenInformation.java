package com.terabite.notifications.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications_token")
public class TokenInformation implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Id
    @NotBlank
    @JsonAlias("token")
    @Column(unique=true)
    private String token;

    @JsonAlias("create_date")
    @CreationTimestamp
    private LocalDateTime creationDate;

    public long getId() {
        return id;
    }

    public void setId(long userId) {
        this.id = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreationDate() {return creationDate; }

    // Set subscription expiration date to be 30 days from the current date
    public void setCreationDate() {this.creationDate = LocalDateTime.now(); }
}
