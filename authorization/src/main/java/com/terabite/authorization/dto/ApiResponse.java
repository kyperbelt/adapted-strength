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
    private Object object;

    public ApiResponse(String message, Object object) {
        this.message = message;
        this.object = object;
    }

    public ApiResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
