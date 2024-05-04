package com.terabite.chat.service;

import org.junit.jupiter.api.Test;
import java.util.Date;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ChatNotificationTest
{
    @Test
    public void validNotification() {
        ChatNotification chatNotification = new ChatNotification();

        chatNotification.setChatId("one@email.com_two@email.com");
        chatNotification.setSenderId("one@email.com");
        chatNotification.setRecipientId("two@email.com");
        chatNotification.setContent("Hee hee haw!");
        chatNotification.setTimeStamp(new Date(2010, 0, 1));

        assertEquals("one@email.com_two@email.com", chatNotification.getChatId());
        assertEquals("one@email.com", chatNotification.getSenderId());
        assertEquals("two@email.com", chatNotification.getRecipientId());
        assertEquals("Hee hee haw!", chatNotification.getContent());
        assertEquals(new Date(2010, 0, 1), chatNotification.getTimeStamp());
    }
}
