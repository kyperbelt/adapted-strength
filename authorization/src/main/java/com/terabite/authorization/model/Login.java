package com.terabite.authorization.model;

import com.fasterxml.jackson.annotation.JsonAlias;

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
    @Email
    @Id
    @JsonAlias("username")
    private String email;
    @NotBlank
    private String password;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "forgot_password_token_id", referencedColumnName = "id")
    private ForgotPasswordToken forgotPasswordToken;

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

    public ForgotPasswordToken getForgotPasswordToken() {
        return forgotPasswordToken;
    }

    public void setResetPasswordToken(ForgotPasswordToken forgotPasswodToken) {
        this.forgotPasswordToken = forgotPasswodToken;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public boolean addRole(String role) {
        if (this.roles.contains(role)) {
            return false;
        }
        this.roles.add(role);
        return true;
    }

    public boolean removeRole(String role) {
        return this.roles.remove(role);
    }
}
