package com.terabite.authorization.dto;


/**
 * A class that represents a standardized json payload
 * <p>
 * Example output
 * <pre>
 * {
 *      "message": "User logged in",
 *      "object": {
 *          "username": "user",
 *          "password": "password"
 *      }
 * }
 * </pre>
 */
public class ApiResponse {
    private String message;
    private Object log;

    public ApiResponse(String message, Object log) {
        this.message = message;
        this.log = log;
    }

    public ApiResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getLog() {
        return log;
    }

    public void setLog(Object log) {
        this.log = log;
    }
}
