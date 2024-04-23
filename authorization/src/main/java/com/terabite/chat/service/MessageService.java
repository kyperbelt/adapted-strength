package com.terabite.chat.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.terabite.chat.model.Message;
import com.terabite.chat.repository.MessageRepository;
import com.terabite.common.dto.Payload;
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
        .orElseThrow();
        message.setChatRoomId(chatId);
        messageRepository.save(message);
        return message;
    }

    public List<Message> findChatMessages(String senderId, String recipientId){
        var chatId = chatRoomService.getChatRoomId(senderId, recipientId, false);
        return chatId.map(messageRepository::findByChatRoomId).orElse(new ArrayList<Message>());
        //return chatId.map(messageRepository::findByChatRoomId).orElse(new ArrayList<Message>());
    }  
    
    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }

    public ResponseEntity<?> setMessageReadById(long id){
        Message message = messageRepository.findById(id).orElse(null);
        
        if (message!= null){
            message.setHasBeenRead(true);
            messageRepository.save(message);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }

    public ResponseEntity<?> getUnreadForUser(String senderId){
        List<Message> unreadMessages = messageRepository.findBySenderIdAndHasBeenRead(senderId, false).orElse(null);

        if (unreadMessages.isEmpty()) {
            return new ResponseEntity<>(Payload.of("false"), HttpStatus.OK);
        } 
        else {
            return new ResponseEntity<>(Payload.of("true"), HttpStatus.OK);
        }
    }

    public ResponseEntity<?> markMessagesAsReadBySender(String senderId){
        List<Message> unreadMessages = messageRepository.findBySenderIdAndHasBeenRead(senderId, false).orElse(null);

        for (Message message: unreadMessages){
            message.setHasBeenRead(true);
            messageRepository.save(message);
        }
        return new ResponseEntity<>(HttpStatus.OK);
        
    }

}
