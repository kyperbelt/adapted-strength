package com.terabite.authorization.service;

public class LoginNotFoundException extends Exception{
    public LoginNotFoundException(String message){
        super(message);
    }
}
