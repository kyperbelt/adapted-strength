package com.terabite.chat.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import com.terabite.chat.model.ChatUser;
import com.terabite.chat.model.UserType;
import com.terabite.chat.repository.ChatUserRepository;

@Service
public class ChatUserService {
    private ChatUserRepository chatUserRepository;

    public ChatUserService(ChatUserRepository chatUserRepository){
        this.chatUserRepository=chatUserRepository;
    }

    public ResponseEntity<?> saveChatUser(ChatUser chatUser){
        if(chatUser!= null){
            chatUserRepository.save(chatUser);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public List<ChatUser> findClientChatUsers(ChatUser chatUser){
        return chatUserRepository.findAllByUserType(UserType.CLIENT);
    }

    public List<ChatUser> findCoachChatUsers(ChatUser chatUser){
        return chatUserRepository.findAllByUserType(UserType.CLIENT);
    }

}
