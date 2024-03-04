package com.terabite.user.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

/**
 * This class is used to map the request body of the update information request.
 * Its different because we dont want to allow updating all the fields after
 * initial account setup.
 * For example, the user should not be able to change their email address after
 * the account is created since that is the unique identifier for the account.
 */
public class UpdateInformationRequestBody {
        @JsonAlias("first_name")
        private String firstName;

        @JsonAlias("last_name")
        private String lastName;

        @JsonAlias("cell_phone")
        private String cellPhone;

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

        public String getCellPhone() {
                return cellPhone;
        }

        public void setCellPhone(String cellPhone) {
                this.cellPhone = cellPhone;
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
