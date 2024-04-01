package com.terabite.chat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue
    private long id;
    private String chatRoomId;
    private String senderId;
    private String recipientId;
    private String content;
    private Date timeStamp;

    public Message(String chatRoomId, String senderId, String recipientId, String content, Date timeStamp){
        this.chatRoomId=chatRoomId;
        this.senderId=senderId;
        this.recipientId=recipientId;
        this.content=content;
        this.timeStamp=timeStamp;
    }

    public Message(){

    }
    
    public String toString(){
        return (String.format("id: %s, chatRoomId: %s, senderId: %s, recipientId: %s, content: %s, timeStamp: %s", id, chatRoomId, senderId, recipientId, content, timeStamp));
    }

    public String getChatRoomId() {
        return chatRoomId;
    }

    public void setChatRoomId(String chatId) {
        this.chatRoomId = chatId;
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
