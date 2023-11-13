package com.terabite.authorization.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.IndexColumn;
import org.hibernate.annotations.ListIndexBase;
import org.hibernate.validator.constraints.UniqueElements;

@Entity
@Table(name = "login_table")
public class Login {
    private LoginStatus loginStatus;
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
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

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(long loginId) {
//        this.id = id;
//    }

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
