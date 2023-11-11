package com.terabite.authorization.service;

public class Address
{
    private String address;
    private String city;
    private String state;
    private String zipcode; //not sure if I should use numbers (12345-6789)

    public Address(String address, String city, String state, String zipcode)
    {
        this.address = address;
        this.city = city;
        this.state = state;
        setZipcode(zipcode);
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

    public void setZipcode(String zipcode)
    {
        /*
        for now 'error' will serve two purposes
            (1) the zipcode entered is not 5 digits long
            (2) the zipcode entered is not numeric
         */
        if (zipcode.length() != 5)
        {
            this.zipcode = "error";
        }
        else if (!zipcode.matches("[0-9]+"))
        {
            this.zipcode = "error";
        }
        else
        {
            this.zipcode = zipcode;
        }
    }
}
