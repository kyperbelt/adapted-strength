package com.terabite.chat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "chat_room")
public class ChatRoom {
    @Id
    private String chatRoomId;
    private String senderId;
    private String recipientId;

    public ChatRoom(String chatRoomId, String senderId, String recipientId){
        this.chatRoomId=chatRoomId;
        this.senderId=senderId;
        this.recipientId=recipientId;
    }

    public ChatRoom(){

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

}
