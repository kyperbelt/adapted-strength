package com.terabite.authorization.service;

public class EmergencyContact
{
    private String firstName;
    private String lastName;
    private Phone phoneNumber;

    public EmergencyContact(String firstName, String lastName, String phoneNumber)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = new Phone(phoneNumber);
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

    public Phone getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Phone phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
