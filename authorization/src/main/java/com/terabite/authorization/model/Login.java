package com.terabite.authorization.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "login_table")
public class Login {

    // TODO: might have to change this email/user name schema to include an actual 
    // unique username, otherwise we cannot allow multiple users with the same email
    // we have to check that the email is also case-sensitive when we do this. 
    @NotNull 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int id;


    @NotNull
    @Email
    @JsonAlias("username")
    private String email;
    @NotBlank
    private String password;

    @Column(name = "reset_password_token")
    private String passwordResetToken;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles;

    public Login(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // FOR Serialization and Deserialization purposes
    public Login() {}

    @Override
    public String toString() {
        return "{ " + " email:" + this.email + " password:" + this.password + " }";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setResetPasswordToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordResetToken() {
        return passwordResetToken;
    }

    public void setPasswordResetToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
