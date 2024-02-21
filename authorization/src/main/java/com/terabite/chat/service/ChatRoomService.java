package com.terabite.chat.service;

import org.springframework.stereotype.Service;

import com.terabite.chat.model.ChatRoom;
import com.terabite.chat.repository.ChatRoomRepository;

import java.util.Optional;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    
    public ChatRoomService(ChatRoomRepository chatRoomRepository){
        this.chatRoomRepository=chatRoomRepository;
    }


    public Optional<String> getChatRoomId(String senderId, String recipientId, boolean createNewRoomIfNotExists){
        //default behavior should be to find a chat room based on 
        //sender/recipient ids. If it does not find a chat room based 
        //on those ids it creates a new (pair of) chat rooms based on 
        //their ids.
        return chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId)
        .map(ChatRoom::getChatId)
        .or(()->{
            if(createNewRoomIfNotExists){
                String chatId=createChatId(senderId, recipientId);
                return Optional.of(chatId);
            }
            return Optional.empty();
        });
        
    }

    private String createChatId(String senderId, String recipientId) {
        String chatId=String.format("%s_%s", senderId, recipientId);
        
        ChatRoom senderRecipient=new ChatRoom(chatId, senderId, recipientId);

        ChatRoom recipientSender=new ChatRoom(chatId, recipientId, senderId);

        chatRoomRepository.save(senderRecipient);

        chatRoomRepository.save(recipientSender);
        
        return chatId;
    }
}
