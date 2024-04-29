package com.terabite.chat.service;

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

    
    public void saveChatUser(ChatUser chatUser){
        if(chatUser!= null){
            chatUser.setUserType(UserType.CLIENT);
<<<<<<< HEAD

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
        List<ChatUser> chatUsers = chatUserRepository.findAllByUserType(UserType.CLIENT);
        if (chatUsers.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<>(chatUsers, HttpStatus.ACCEPTED);
        }
    }

    public ResponseEntity<List<ChatUser>> findCoachChatUsers(ChatUser chatUser){
        List<ChatUser> chatUsers = chatUserRepository.findAllByUserType(UserType.COACH);
        if (chatUsers.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<>(chatUsers, HttpStatus.ACCEPTED);
        }
=======

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
        List<ChatUser> chatUsers = chatUserRepository.findAllByUserType(UserType.CLIENT);
        return new ResponseEntity<>(chatUsers, HttpStatus.OK);
    }

    public ResponseEntity<List<ChatUser>> findCoachChatUsers(ChatUser chatUser){
        List<ChatUser> chatUsers = chatUserRepository.findAllByUserType(UserType.COACH);
        return new ResponseEntity<>(chatUsers, HttpStatus.OK);
>>>>>>> main
    }

}
