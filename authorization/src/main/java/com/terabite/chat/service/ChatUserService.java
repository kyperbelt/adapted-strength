package com.terabite.chat.service;

import com.terabite.common.Roles;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.chat.model.ChatUser;
import com.terabite.chat.model.UserType;
import com.terabite.chat.repository.ChatUserRepository;

@Service
public class ChatUserService {
    private final ChatUserRepository chatUserRepository;
    private final LoginRepository loginRepository;

    public ChatUserService(ChatUserRepository chatUserRepository, LoginRepository loginRepository){
        this.chatUserRepository=chatUserRepository;
        this.loginRepository = loginRepository;
    }

    
    public void saveChatUser(ChatUser chatUser)
    {
        if (chatUser == null)
        {
            return;

        }

        Login login = loginRepository.findById(chatUser.getEmail()).orElse(null);

        if (login == null)
        {
            return;
        }

        for (String role : login.getRoles())
        {
            if (role.equals("ROLE_ADMIN") || role.equals("ROLE_COACH"))
            {
                chatUser.setUserType(UserType.CLIENT);
                break;
            }
            else if (role.equals("ROLE_BASE_CLIENT") || role.equals("ROLE_GENERAL_CLIENT") || role.equals("ROLE_SPECIFIC_CLIENT"))
            {
                chatUser.setUserType(UserType.COACH);
                break;
            }
        }

        chatUserRepository.save(chatUser);
    }

    public ResponseEntity<List<ChatUser>>  findClientChatUsers(ChatUser chatUser){
        List<ChatUser> chatUsers = chatUserRepository.findAllByUserType(UserType.CLIENT);
        return new ResponseEntity<>(chatUsers, HttpStatus.OK);
    }

    public ResponseEntity<List<ChatUser>> findCoachChatUsers(ChatUser chatUser){
        List<ChatUser> chatUsers = chatUserRepository.findAllByUserType(UserType.COACH);
        return new ResponseEntity<>(chatUsers, HttpStatus.OK);
    }

}
