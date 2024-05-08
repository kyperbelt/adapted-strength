package com.terabite.chat.service;

import com.terabite.common.Roles;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        if(chatUser!= null){
            chatUser.setUserType(UserType.CLIENT);

            if(chatUser.getEmail()!= null){
                Login login = loginRepository.findById(chatUser.getEmail()).orElse(null);

                if(login != null){
                    List <String> roles = login.getRoles();
                    for (int i = 0; i< roles.size(); i++){
                        if(roles.get(i).contains("ROLE_ADMIN")  || roles.get(i).contains("ROLE_COACH") ){
                            chatUser.setUserType(UserType.COACH);
                        }
                    }
                }
            }
            chatUserRepository.save(chatUser);
        }
    }

    public ResponseEntity<List<ChatUser>>  findClientChatUsers(ChatUser chatUser){
        List<ChatUser> allChatUsers = chatUserRepository.findAllByUserType(UserType.CLIENT);
        List<ChatUser> filteredChatUsers = new ArrayList<>();
        for(ChatUser user : allChatUsers) {
            Login userLogin = loginRepository.findById(user.getEmail()).orElse(null);

            List<String> roles = userLogin.getRoles();

            if (roles.contains("ROLE_BASE_CLIENT") || roles.contains("ROLE_GENERAL") || roles.contains("ROLE_SPECIFIC_CLIENT")) {
                filteredChatUsers.add(user);
            }
        }
        return new ResponseEntity<>(filteredChatUsers, HttpStatus.OK);
    }

    public ResponseEntity<List<ChatUser>> findCoachChatUsers(ChatUser chatUser){
        List<ChatUser> chatUsers = chatUserRepository.findAllByUserType(UserType.COACH);
        return new ResponseEntity<>(chatUsers, HttpStatus.OK);
    }

}
