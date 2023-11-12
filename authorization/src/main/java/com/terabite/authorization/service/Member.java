package com.terabite.authorization.service;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.Date;
import java.util.Map;

@Entity
public class Member
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long member_id;

    @NotBlank(message = "First name cannot be blank")
    private String first_name;

    @NotBlank(message = "Last name cannot be blank")
    private String last_name;

    @NotNull
    @Pattern(message = "Enter date of birth in this format: MM/DD/YYYY", regexp = "^\\d{2}/\\d{2}/\\d{4}$")
    private Date date_of_birth;

    @NotNull
    @Pattern(message = "Enter either 'M' or 'F'", regexp = "^[M,F]$")
    private char sex;


    //private String shirt_size;
    //private Map<String, String> address;


    //private String cell_phone;
    //private String home_phone;

    @Email
    private String email;


    //private Map<String, String> emergency_contact;
}
