package com.terabite.chat.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

import com.terabite.chat.model.Message;
import com.terabite.chat.repository.MessageRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final ChatRoomService chatRoomService;

    public MessageService(MessageRepository messageRepository, ChatRoomService chatRoomService){
        this.messageRepository=messageRepository;
        this.chatRoomService=chatRoomService;
    }

    public Message save(Message message){
        String chatId = chatRoomService.getChatRoomId(message.getSenderId(), message.getRecipientId(), true)
        //implement a custom exception for if chat room id is not found
        .orElseThrow();
        message.setChatRoomId(chatId);
        messageRepository.save(message);
        return message;
    }

    public List<Message> findChatMessages(String senderId, String recipientId){
        var chatId=chatRoomService.getChatRoomId(senderId, recipientId, false);
        return chatId.map(messageRepository::findByChatRoomId).orElse(new ArrayList<Message>());
    }   

}
