package com.terabite.authorization.log;

public class LoginNotFoundException extends RuntimeException {
    public LoginNotFoundException(String email) {
        super("Could not find login " + email);
    }
}
