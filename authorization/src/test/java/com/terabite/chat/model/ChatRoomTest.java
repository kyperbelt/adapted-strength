package com.terabite.chat.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ChatRoomTest {
    @Test
    public void testSettersAndGetters () {
        ChatRoom chatRoom = new ChatRoom();

        chatRoom.setChatRoomId("hello@email.com_world@email.com");
        chatRoom.setSenderId("hello@email.com");
        chatRoom.setRecipientId("world@email.com");

        assertEquals("hello@email.com_world@email.com", chatRoom.getChatRoomId());
        assertEquals("hello@email.com", chatRoom.getSenderId());
        assertEquals("world@email.com", chatRoom.getRecipientId());
    }
}
