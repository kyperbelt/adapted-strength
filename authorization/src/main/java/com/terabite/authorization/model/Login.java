package com.terabite.authorization.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.terabite.authorization.service.UserInformation;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "login_table")
public class Login
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(mappedBy = "login")
    private UserInformation userInformation;


    @NotNull
    @Email
    @JsonAlias("username")
    private String email;

    @NotBlank
    private String password;

    @Column(name= "reset_password_token")
    private String passwordResetToken;

    public Long getId() {
        return id;
    }

    public void setId(long loginId) {
        this.id = id;
    }

    public UserInformation getUserInformation() {
        return userInformation;
    }

    public void setUserInformation(UserInformation userInformation) {
        this.userInformation = userInformation;
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

    public String getPasswordResetToken(){
        return this.passwordResetToken;
    }

    public void setResetPasswordToken(String passwordResetToken){
        this.passwordResetToken=passwordResetToken;
    }
}
