package com.terabite.chat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import java.util.List;
import com.terabite.chat.model.ChatUser;
import com.terabite.chat.service.ChatUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/v1/chat")
public class ChatUserController {
    private final ChatUserService chatUserService;

    public ChatUserController(ChatUserService chatUserService){
        this.chatUserService=chatUserService;
    }


    @MessageMapping("/chatUser.addUser")
    //this is a queue that the front end will need to subscribe to
    @SendTo("/chatUser/topic")
    //this method will likely need to be called when a user is created in userInformation
    public ChatUser addChatUser(@Payload ChatUser chatUser){
        chatUserService.saveChatUser(chatUser);
        return chatUser;
    }

    //this method/endpoint will be called when coach wants to see all the clients to pick who to chat with
    @GetMapping("/chatUsers")
    public ResponseEntity<List<ChatUser>> findChatUsers() {
        return ResponseEntity.ok(chatUserService.findClients());
    }

    //this method/endpoint is for when users want to chat with coach
    @GetMapping("/chatCoach")
    public ResponseEntity<List<ChatUser>> findCoach(){
        return ResponseEntity.ok(chatUserService.findCoach());
    }

    
    
}
