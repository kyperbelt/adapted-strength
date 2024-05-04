package com.terabite.chat.service;

import com.terabite.chat.model.ChatRoom;
import com.terabite.chat.repository.ChatRoomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ChatRoomServiceTest {

    @Mock
    private ChatRoomRepository chatRoomRepository;

    private ChatRoomService chatRoomService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        chatRoomService = new ChatRoomService(chatRoomRepository);
    }

    @Test
    void testGetChatRoomIdExistingRoom() {
        String senderId = "123@email.com";
        String recipientId = "456@email.com";
        Optional<ChatRoom> chatRoom = Optional.of(new ChatRoom("123@email.com_456@email.com", senderId, recipientId));
        when(chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId)).thenReturn(chatRoom);

        Optional<String> result = chatRoomService.getChatRoomId(senderId, recipientId, false);
        assertTrue(result.isPresent());
        assertEquals("123@email.com_456@email.com", result.get());
    }

    @Test
    void testGetChatRoomIdNoRoomAndCreateNewRoom() {
        String senderId = "123@email.com";
        String recipientId = "456@email.com";
        when(chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId)).thenReturn(Optional.empty());

        Optional<String> result = chatRoomService.getChatRoomId(senderId, recipientId, true);
        assertTrue(result.isPresent());
        assertEquals("123@email.com_456@email.com", result.get());
        verify(chatRoomRepository, times(2)).save(any(ChatRoom.class));
    }

    @Test
    void testGetChatRoomIdNoRoomAndNotCreate() {
        String senderId = "123@email.com";
        String recipientId = "456@email.com";
        when(chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId)).thenReturn(Optional.empty());

        Optional<String> result = chatRoomService.getChatRoomId(senderId, recipientId, false);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetAllChatRooms() {
        List<ChatRoom> chatRooms = new ArrayList<>();
        chatRooms.add(new ChatRoom("123@email.com_456@email.com", "123@email.com", "456@email.com"));
        chatRooms.add(new ChatRoom("456@email.com_123@email.com", "456@email.com", "123@email.com"));

        when(chatRoomRepository.findAll()).thenReturn(chatRooms);

        List<ChatRoom> result = chatRoomService.getAllChatRooms();
        assertNotNull(result);
        assertEquals(2, result.size());
    }
}
