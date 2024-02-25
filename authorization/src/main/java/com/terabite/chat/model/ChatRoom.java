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
    //for front end to be able to tell if there is a new message
    private Boolean hasNewMessage;

    //no id in this constructor because of how create chat is structured atm
    public ChatRoom(String chatRoomId, String senderId, String recipientId, Boolean hasNewMessage){
        this.chatRoomId=chatRoomId;
        this.senderId=senderId;
        this.recipientId=recipientId;
        this.hasNewMessage=hasNewMessage;
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

    public Boolean getHasNewMessage() {
        return hasNewMessage;
    }

    public void setHasNewMessage(Boolean hasNewMessage) {
        this.hasNewMessage = hasNewMessage;
    }
}
