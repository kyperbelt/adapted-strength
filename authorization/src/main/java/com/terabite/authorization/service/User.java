package com.terabite.authorization.service;

public class User
{
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private Address address;
    private Phone cellphone;
    private Phone homePhone;
    private String email;
    private Sex sex;
    private ShirtSize shirtSize;
    private EmergencyContact emergencyContact;

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

    public User(String firstName, String lastName, String dateOfBirth, String address, String city, String state, String zipcode, String cellPhone, String homePhone, String email, Sex sex, ShirtSize shirtSize, String eFirstName, String eLastName, String ePhoneNumber)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        setDateOfBirth(dateOfBirth);
        this.address = new Address(address, city, state, zipcode);
        this.cellphone = new Phone(cellPhone);
        this.homePhone = new Phone(homePhone);
        setEmail(email);
        this.sex = sex;
        this.shirtSize = shirtSize;
        this.emergencyContact = new EmergencyContact(eFirstName, eLastName, ePhoneNumber);
    }

    public String getDateOfBirth()
    {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth)
    {
        // format MM-DD-YYYY
        if (dateOfBirth.length() != 8)
        {
            this.dateOfBirth = "error";
        }
        else if (!dateOfBirth.matches("[0-9]+"))
        {
            this.dateOfBirth = "error";
        }
        else
        {
            this.dateOfBirth = dateOfBirth;
        }
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        if(!email.contains("@"))
        {
            this.email = "error";
        }
        else
        {
            this.email = email;
        }
    }

    public Sex getSex() {
        return sex;
    }

    public ShirtSize getShirtSize() {
        return shirtSize;
    }

    public void setSex(Sex sex)
    {
        this.sex = sex;
    }

    public void setShirtSize(ShirtSize shirtSize)
    {
        this.shirtSize = shirtSize;
    }
}
