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

    //This method returns a list of clients if a coach accesses or coaches if a client accesses
    public List<ChatUser> findUsers(ChatUser chatUser){
        if (chatUser.getUserType() == UserType.CLIENT){
            return chatUserRepository.findAllByUserType(UserType.COACH);
        }
        else{
            return chatUserRepository.findAllByUserType(UserType.CLIENT);
        }
    }



}
