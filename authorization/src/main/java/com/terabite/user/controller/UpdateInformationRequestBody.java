package com.terabite.user.controller;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonAlias;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;

public class UpdateInformationRequestBody {
        @JsonAlias("first_name")
        private String firstName;

        @JsonAlias("last_name")
        private String lastName;

        @NotNull
        @JsonAlias("date_of_birth")
        @Column(columnDefinition = "date")
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        @Temporal(TemporalType.DATE)
        private Date dateOfBirth;

        @JsonAlias("shirt_size")
        private String shirtSize;

        @JsonAlias("cell_phone")
        private String cellPhone;

        @JsonAlias("home_phone")
        private String homePhone;

        @JsonAlias("address")
        private String address;

        @JsonAlias("city")
        private String city;

        @JsonAlias("state")
        private String state;

        @JsonAlias("zipcode")
        private String zipcode;

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

        public Date getDateOfBirth() {
                return dateOfBirth;
        }

        public void setDateOfBirth(Date dateOfBirth) {
                this.dateOfBirth = dateOfBirth;
        }

        public String getShirtSize() {
                return shirtSize;
        }

        public void setShirtSize(String shirtSize) {
                this.shirtSize = shirtSize;
        }

        public String getCellPhone() {
                return cellPhone;
        }

        public void setCellPhone(String cellPhone) {
                this.cellPhone = cellPhone;
        }

        public String getHomePhone() {
                return homePhone;
        }

        public void setHomePhone(String homePhone) {
                this.homePhone = homePhone;
        }

        public String getAddress() {
                return address;
        }

        public void setAddress(String address) {
                this.address = address;
        }

        public String getCity() {
                return city;
        }

        public void setCity(String city) {
                this.city = city;
        }

        public String getState() {
                return state;
        }

        public void setState(String state) {
                this.state = state;
        }

        public String getZipcode() {
                return zipcode;
        }

        public void setZipcode(String zipcode) {
                this.zipcode = zipcode;
        }

}
