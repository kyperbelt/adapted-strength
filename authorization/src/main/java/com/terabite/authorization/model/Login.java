package com.terabite.authorization.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "login_table")
public class Login {
    private LoginStatus loginStatus;
    @OneToOne(mappedBy = "login")
    private UserInformation userInformation;
    @NotNull
    @Email
    @JsonAlias("username")
    @Id
    private String email;
    @NotBlank
    private String password;

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


}
