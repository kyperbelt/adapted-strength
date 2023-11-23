package com.terabite.authorization.repository;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String email) {
        super("Could not find login " + email);
    }
}
