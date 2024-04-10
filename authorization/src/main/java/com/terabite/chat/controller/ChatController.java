package com.terabite.chat.controller;

import com.terabite.chat.model.ChatRoom;
import com.terabite.chat.model.ChatUser;
import com.terabite.chat.model.Message;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.terabite.chat.service.ChatNotification;
import com.terabite.chat.service.ChatRoomService;
import com.terabite.chat.service.ChatUserService;
import com.terabite.chat.service.MessageService;
import org.springframework.web.bind.annotation.PostMapping;



@Controller
@RequestMapping("")
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;
    private final ChatUserService chatUserService;
    private final ChatRoomService chatRoomService;
    
    public ChatController(MessageService messageService, SimpMessagingTemplate messagingTemplate, ChatUserService chatUserService, ChatRoomService chatRoomService){
        this.messageService=messageService;
        this.messagingTemplate=messagingTemplate;
        this.chatUserService=chatUserService;
        this.chatRoomService=chatRoomService;
    }

    @MessageMapping("/processMessage")
    public void processMessage(@Payload Message message){
        message.setHasBeenRead(false);
        Message savedMessage=messageService.save(message);
        
        ChatNotification chatNotification = new ChatNotification(savedMessage.getChatRoomId(), savedMessage.getSenderId(), savedMessage.getRecipientId(), savedMessage.getContent());
        //front end will be subscribing to bob/queue/message where bob is the user
        if(savedMessage.getRecipientId()!= null){
            messagingTemplate.convertAndSendToUser(savedMessage.getRecipientId(), "/queue/messages", chatNotification);
        }
    }
 
    @GetMapping("/v1/chat/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<Message>> findChatMessages(@PathVariable("senderId") String senderId, @PathVariable("recipientId") String recipientId){
        return ResponseEntity.ok(messageService.findChatMessages(senderId, recipientId));
    }

    @MessageMapping("/chatUser.addUser")
    //this is a queue that the front end will need to subscribe to
    @SendTo("/chatUser/topic")
    public ChatUser addChatUser(@Payload ChatUser chatUser){
        chatUserService.saveChatUser(chatUser);       // this is where chat user role is assigned
        return chatUser;
    }


    @GetMapping("/v1/chat/clientChatUsers")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<ChatUser>> findClientChatUsers(@RequestBody ChatUser chatUser) {
        return chatUserService.findClientChatUsers(chatUser);
    }

    @GetMapping("/v1/chat/coachChatUsers")
    public ResponseEntity<List<ChatUser>> findCoachChatUsers(@RequestBody ChatUser chatUser) {
        return chatUserService.findCoachChatUsers(chatUser);
    }
    

    //TODO: for testing purposes only, we should not keep this
    @GetMapping("/v1/chat/messages")
    public ResponseEntity<List<Message>> getMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    //TODO: for testing purposes only, we should not keep this
    @GetMapping("/v1/chat/chatRooms")
    public ResponseEntity<List<ChatRoom>> getChatRooms() {
        return ResponseEntity.ok(chatRoomService.getAllChatRooms());
    }

    @PostMapping("/v1/chat/message/setMessageRead/")
    public ResponseEntity<?> setMessageReadById(@PathVariable("messageId") long id){
        return messageService.setMessageReadById(id);
    }
}
