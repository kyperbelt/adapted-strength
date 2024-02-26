package com.terabite.chat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.terabite.chat.model.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String>{

    Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId);
    
}
