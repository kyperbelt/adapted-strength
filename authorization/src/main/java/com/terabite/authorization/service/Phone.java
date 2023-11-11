package com.terabite.authorization.service;

public class Phone
{
    private String areaCode;
    private String localNumber;
    private String phoneNumber;

    public Phone(String phoneNumber)
    {
        setPhoneNumber(phoneNumber);
    }

    public String getAreaCode()
    {
        return this.areaCode;
    }

    public String getLocalNumber()
    {
        return this.localNumber;
    }

    public String getPhoneNumber()
    {
        return this.phoneNumber;
    }

    public String getFormattedPhoneNumber()
    {
        return String.format("(%s) %s-%s", this.areaCode, this.localNumber.substring(0, 3), this.localNumber.substring(3));
    }

    public void setPhoneNumber(String phoneNumber)
    {
        /*
        for now 'error' will serve two purposes
            (1) the phone number entered is not 10 digits long
            (2) the phone number entered is not numeric
         */
        if (phoneNumber.length() != 10)
        {
            this.phoneNumber = "error";
        }
        else if (!phoneNumber.matches("[0-9]+"))
        {
            this.phoneNumber = "error";
        }
        else
        {
            this.phoneNumber = phoneNumber;
            this.areaCode = phoneNumber.substring(0, 3);
            this.localNumber = phoneNumber.substring(3);
        }
    }
}

