package com.terabite.chat.service;

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

    public void saveChatUser(ChatUser chatUser){
        chatUserRepository.save(chatUser);
    }

    public List<ChatUser> findClients(){
        return chatUserRepository.findAllByUserType(UserType.CLIENT);
    }

    public List<ChatUser> findCoach() {
        return chatUserRepository.findByUserType(UserType.COACH);
    }

}
