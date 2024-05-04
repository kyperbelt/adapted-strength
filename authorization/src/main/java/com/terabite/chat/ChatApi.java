package com.terabite.chat;

import com.terabite.chat.model.ChatUser;
import com.terabite.chat.model.UserType;
import com.terabite.chat.repository.ChatUserRepository;

/**
 * ChatApi
 */
public class ChatApi {

    private final ChatUserRepository chatUserRepository;

    public ChatApi(ChatUserRepository chatUserRepository) {
        this.chatUserRepository = chatUserRepository;
    }

    public void createUser(String email, String fullName, String userType) {

        UserType type = UserType.valueOf(userType);

        ChatUser user = new ChatUser();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setUserType(type);

        chatUserRepository.save(user);
    }

    
}
