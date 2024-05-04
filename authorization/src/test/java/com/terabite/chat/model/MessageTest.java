package com.terabite.chat.model;

import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MessageTest {
    @Test
    public void testSettersAndGetters() {
        Message message = new Message();

        message.setId(1l);
        message.setChatRoomId("a@b.com_c@d.com");
        message.setSenderId("a@b.com");
        message.setRecipientId("c@d.com");
        message.setContent("Hello World!");
        message.setTimeStamp(new Date(2000, 4, 3));
        message.setHasBeenRead(Boolean.TRUE);

        assertEquals(1l, message.getId());
        assertEquals("a@b.com_c@d.com", message.getChatRoomId());
        assertEquals("a@b.com", message.getSenderId());
        assertEquals("c@d.com", message.getRecipientId());
        assertEquals("Hello World!", message.getContent());
        assertEquals(new Date(2000, 4, 3), message.getTimeStamp());
        assertEquals(Boolean.TRUE, message.getHasBeenRead());
    }
}
