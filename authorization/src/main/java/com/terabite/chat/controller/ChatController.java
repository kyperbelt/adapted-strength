package com.terabite.chat.controller;

import com.terabite.chat.model.Message;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.terabite.chat.service.ChatNotification;
import com.terabite.chat.service.MessageService;

@Controller
@RequestMapping("/v1/chat")
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;
    
    public ChatController(MessageService messageService, SimpMessagingTemplate messagingTemplate){
        this.messageService=messageService;
        this.messagingTemplate=messagingTemplate;
    }

    @MessageMapping("/process_message")
    public void processMessage(@Payload Message message){
        Message savedMessage=messageService.save(message);
        //front end will be subscribing to bob/queue/message where bob is the user
        messagingTemplate.convertAndSendToUser(savedMessage.getRecipientId(), "/queue/messages",
        new ChatNotification(savedMessage.getChatId(), savedMessage.getSenderId(), savedMessage.getRecipientId(), savedMessage.getContent()));
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<Message>> findChatMessages(@PathVariable("senderId") String senderId, @PathVariable("recipientId") String recipientId){
        return ResponseEntity.ok(messageService.findChatMessages(senderId, recipientId));
    }
}
