package com.terabite.authorization.service;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.terabite.authorization.model.UserInformation;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "emergency_contact_table")
public class EmergencyContact
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne(mappedBy = "emergencyContact")
    private UserInformation userInformation;

    @NotBlank
    @JsonAlias("first_name")
    private String firstName;

    @NotBlank
    @JsonAlias("last_name")
    private String lastName;

    @NotNull
    @Pattern(regexp = "^[0-9]{10}$")
    @JsonAlias("phone_number")
    private String phoneNumber;

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserInformation getUserInformation() {
        return userInformation;
    }

    public void setUserInformation(UserInformation userInformation) {
        this.userInformation = userInformation;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
