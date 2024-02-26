package com.terabite.chat.controller;

import com.terabite.chat.model.ChatRoom;
import com.terabite.chat.model.ChatUser;
import com.terabite.chat.model.Message;
import com.terabite.chat.model.UserType;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.terabite.chat.service.ChatNotification;
import com.terabite.chat.service.ChatRoomService;
import com.terabite.chat.service.ChatUserService;
import com.terabite.chat.service.MessageService;
import org.springframework.web.bind.annotation.PostMapping;



@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@Controller
@RequestMapping("/v1/chat")
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
        Message savedMessage=messageService.save(message);
        //front end will be subscribing to bob/queue/message where bob is the user
        messagingTemplate.convertAndSendToUser(savedMessage.getRecipientId(), "/queue/messages",
        new ChatNotification(savedMessage.getChatRoomId(), savedMessage.getSenderId(), savedMessage.getRecipientId(), savedMessage.getContent()));
        
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<Message>> findChatMessages(@PathVariable("senderId") String senderId, @PathVariable("recipientId") String recipientId){
        return ResponseEntity.ok(messageService.findChatMessages(senderId, recipientId));
    }

    @MessageMapping("/chatUser.addUser")
    //this is a queue that the front end will need to subscribe to
    @SendTo("/chatUser/topic")
    public ChatUser addChatUser(@Payload ChatUser chatUser){
        chatUserService.saveChatUser(chatUser);
        return chatUser;
    }

    // This endpoint returns a payload of clients if the requestbody is a coach or a coach if the requestbody is a client
    // We will have to change to checking via JWT tokens which should remove the need for a requestbody, but the functionality should remain
    @GetMapping("/chatUsers")
    public ResponseEntity<List<ChatUser>> findChatUsers(@RequestBody ChatUser chatUser) {
        return ResponseEntity.ok(chatUserService.findUsers(chatUser));
    }

    //TODO: for testing purposes only, we should not keep this
    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    //TODO: for testing purposes only, we should not keep this
    @GetMapping("/chatRooms")
    public ResponseEntity<List<ChatRoom>> getChatRooms() {
        return ResponseEntity.ok(chatRoomService.getAllChatRooms());
    }

    @PostMapping("/chatRoom/setUnreadFalse")
    public ResponseEntity<HttpStatus> setUnreadFalse(@RequestBody ChatRoom chatRoom) {
        chatRoomService.setUnreadFalse(chatRoom);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
