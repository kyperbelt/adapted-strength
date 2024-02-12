package com.terabite.authorization.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "login_table")
public class Login {
    private LoginStatus loginStatus;

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

    @Column(name = "reset_password_token")
    private String passwordResetToken;

    public Login(String email, String password) {
        this.email = email;
        this.password = password;
        this.loginStatus = LoginStatus.LOGGED_OUT;
    }

    public Login() {

    }

    public LoginStatus getLoginStatus() {
        return loginStatus;
    }

    public void setLoginStatus(LoginStatus loginStatus) {
        this.loginStatus = loginStatus;
    }

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

    public String getPasswordResetToken() {
        return this.passwordResetToken;
    }

    public void setResetPasswordToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }
}
