package com.terabite.chat.service;

import org.springframework.stereotype.Service;

import com.terabite.chat.model.ChatRoom;
import com.terabite.chat.repository.ChatRoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    
    public ChatRoomService(ChatRoomRepository chatRoomRepository){
        this.chatRoomRepository=chatRoomRepository;
    }


    public Optional<String> getChatRoomId(String senderId, String recipientId, boolean createNewRoomIfNotExists){
        //find a chat room based on sender/recipient ids. If it does not find a chat room based 
        //on those ids it creates a new (pair of) chat rooms based on their ids.
        return chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId)
        .map(ChatRoom::getChatRoomId)
        .or(()->{
            if(createNewRoomIfNotExists){
                String chatId=createChatId(senderId, recipientId);
                return Optional.of(chatId);
            }
            return Optional.empty();
        });
    }

    private String createChatId(String senderId, String recipientId) {
        String senderChatId = String.format("%s_%s", senderId, recipientId);
        String recipientChatId = String.format("%s_%s", recipientId, senderId);

        ChatRoom senderRecipient = new ChatRoom(senderChatId, senderId, recipientId);
        ChatRoom recipientSender = new ChatRoom(recipientChatId, recipientId, senderId);

        chatRoomRepository.save(senderRecipient);
        chatRoomRepository.save(recipientSender);
        
        return String.format("%s, %s", senderChatId, recipientChatId);
    }


    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }


}
