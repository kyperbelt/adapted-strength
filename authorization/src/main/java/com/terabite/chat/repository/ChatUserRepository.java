package com.terabite.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.chat.model.ChatUser;
import com.terabite.chat.model.UserType;

public interface ChatUserRepository extends JpaRepository<ChatUser, String>{

    List<ChatUser> findByUserType(UserType coach);
    
    List<ChatUser> findAllByUserType(UserType client);
    
}
