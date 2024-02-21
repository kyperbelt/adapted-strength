package com.terabite.authorization.dto;

import lombok.Data;

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
@Data
public class ApiResponse {
    private String message;
    private Object object;

    public ApiResponse(String message, Object object) {
        this.message = message;
        this.object = object;
    }
}
