package com.terabite.chat.service;

import java.util.Date;

public class ChatNotification {
    private String chatId;
    private String senderId;
    private String recipientId;
    private String content;
    private Date timeStamp;

    public ChatNotification() {

    }

    public ChatNotification(String chatId, String senderId, String recipientId, String content, Date timeStamp){
        this.chatId=chatId;
        this.senderId=senderId;
        this.recipientId=recipientId;
        this.content=content;
        this.timeStamp=timeStamp;
    }

    public String getChatId() {
        return chatId;
    }
    public void setChatId(String chatId) {
        this.chatId = chatId;
    }
    
    public String getSenderId() {
        return senderId;
    }
    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }
    
    public String getRecipientId() {
        return recipientId;
    }
    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }
    
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }
}
