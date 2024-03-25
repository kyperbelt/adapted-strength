package com.terabite.notifications.model;

import jakarta.persistence.Id;

public class NotificationRequest {
    @Id
    private int id;
    private String title;
    private String body;
    private String token;
    private String type;

    public NotificationRequest()
    {

    }

    public NotificationRequest(String title, String body, String token, String type)
    {
        this.title = title;
        this.body = body;
        this.token = token;
        this.type = type;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getTitle()
    {
        return title;
    }


    public void setBody(String body)
    {
        this.body = body;
    }

    public String getBody()
    {
        return body;
    }


    public void setToken(String token)
    {
        this.token = token;
    }

    public String getToken()
    {
        return token;
    }


    public void setType(String type)
    {
        this.type = type;
    }

    public String getType()
    {
        return type;
    }
}
