package com.terabite.notifications.model;

import jakarta.persistence.Id;

public class NotificationResponse {
    @Id
    private int id;
    private int status;
    private String message;

    public NotificationResponse()
    {
    }

    public NotificationResponse(int status, String message)
    {
        this.status = status;
        this.message = message;
    }

    public void setStatus(int status)
    {
        this.status = status;
    }

    public int getStatus()
    {
        return status;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public String getMessage()
    {
        return message;
    }
}
