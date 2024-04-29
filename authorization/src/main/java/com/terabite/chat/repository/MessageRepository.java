package com.terabite.chat.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.terabite.chat.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{

    List<Message> findByChatRoomId(String chatId);


    Optional<List<Message>> findBySenderIdAndHasBeenRead(String senderId, boolean hasBeenRead);
    
}
