package com.terabite.authorization.service;

import java.util.Date;

public class Utility
{
    public static boolean isLengthN(String string, int length)
    {
        return (string.length() == length);
    }

    public static boolean isNumeric(String string)
    {
        return string.matches("[0-9]+");
    }

    public static boolean isAlpha(String string)
    {
        return string.toLowerCase().matches("[a-z]+");
    }
}

class Runner
{
    public static void main(String[] args)
    {
        Date date = new Date(2023, 3, 3);
        System.out.println(date);

    }
}