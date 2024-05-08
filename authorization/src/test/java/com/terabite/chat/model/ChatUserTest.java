package com.terabite.chat.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ChatUserTest {
    @Test
    public void validateChatUser()
    {
        ChatUser chatUser = new ChatUser();

        chatUser.setFullName("Awesome Sauce");
        chatUser.setUserType(UserType.COACH);
        chatUser.setEmail("awesome@here.com");

        assertEquals("Awesome Sauce", chatUser.getFullName());
        assertEquals(UserType.COACH, chatUser.getUserType());
        assertEquals("awesome@here.com", chatUser.getEmail());
    }
}
