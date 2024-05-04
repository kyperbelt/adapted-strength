package com.terabite.chat.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.terabite.chat.model.ChatRoom;
import com.terabite.chat.repository.ChatRoomRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

@RunWith(MockitoJUnitRunner.class)
public class ChatRoomServiceTest {

    @Mock
    private ChatRoomRepository chatRoomRepository;

    @InjectMocks
    private ChatRoomService chatRoomService;

    private ChatRoom chatRoom;
    private List<ChatRoom> chatRoomList;

    @Before
    public void setUp() {
        chatRoom = new ChatRoom("one@email.com_two@email.com", "one@email.com", "two@email.com");
        chatRoomList = new ArrayList<>();
        chatRoomList.add(chatRoom);
        chatRoomRepository = new ChatRoomRepository() {
            @Override
            public Optional<ChatRoom> findBySenderIdAndRecipientId(String senderId, String recipientId) {
                return Optional.empty();
            }

            @Override
            public void flush() {

            }

            @Override
            public <S extends ChatRoom> S saveAndFlush(S entity) {
                return null;
            }

            @Override
            public <S extends ChatRoom> List<S> saveAllAndFlush(Iterable<S> entities) {
                return null;
            }

            @Override
            public void deleteAllInBatch(Iterable<ChatRoom> entities) {

            }

            @Override
            public void deleteAllByIdInBatch(Iterable<String> strings) {

            }

            @Override
            public void deleteAllInBatch() {

            }

            @Override
            public ChatRoom getOne(String s) {
                return null;
            }

            @Override
            public ChatRoom getById(String s) {
                return null;
            }

            @Override
            public ChatRoom getReferenceById(String s) {
                return null;
            }

            @Override
            public <S extends ChatRoom> List<S> findAll(Example<S> example) {
                return null;
            }

            @Override
            public <S extends ChatRoom> List<S> findAll(Example<S> example, Sort sort) {
                return null;
            }

            @Override
            public <S extends ChatRoom> List<S> saveAll(Iterable<S> entities) {
                return null;
            }

            @Override
            public List<ChatRoom> findAll() {
                return null;
            }

            @Override
            public List<ChatRoom> findAllById(Iterable<String> strings) {
                return null;
            }

            @Override
            public <S extends ChatRoom> S save(S entity) {
                return null;
            }

            @Override
            public Optional<ChatRoom> findById(String s) {
                return Optional.empty();
            }

            @Override
            public boolean existsById(String s) {
                return false;
            }

            @Override
            public long count() {
                return 0;
            }

            @Override
            public void deleteById(String s) {

            }

            @Override
            public void delete(ChatRoom entity) {

            }

            @Override
            public void deleteAllById(Iterable<? extends String> strings) {

            }

            @Override
            public void deleteAll(Iterable<? extends ChatRoom> entities) {

            }

            @Override
            public void deleteAll() {

            }

            @Override
            public List<ChatRoom> findAll(Sort sort) {
                return null;
            }

            @Override
            public Page<ChatRoom> findAll(Pageable pageable) {
                return null;
            }

            @Override
            public <S extends ChatRoom> Optional<S> findOne(Example<S> example) {
                return Optional.empty();
            }

            @Override
            public <S extends ChatRoom> Page<S> findAll(Example<S> example, Pageable pageable) {
                return null;
            }

            @Override
            public <S extends ChatRoom> long count(Example<S> example) {
                return 0;
            }

            @Override
            public <S extends ChatRoom> boolean exists(Example<S> example) {
                return false;
            }

            @Override
            public <S extends ChatRoom, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
                return null;
            }
        };
    }

    @Test
    public void testGetChatRoomId_ExistingRoom() {
        when(chatRoomRepository.findBySenderIdAndRecipientId("one@email.com", "two@email.com")).thenReturn(Optional.of(chatRoom));
        Optional<String> chatRoomId = chatRoomService.getChatRoomId("one@email.com", "two@email.com", false);
        assertEquals(Optional.of("1"), chatRoomId);
    }

    @Test
    public void testGetChatRoomId_NewRoom() {
        when(chatRoomRepository.findBySenderIdAndRecipientId("one@email.com", "two@email.com")).thenReturn(Optional.empty());
        when(chatRoomRepository.save(any(ChatRoom.class))).thenReturn(chatRoom);
        Optional<String> chatRoomId = chatRoomService.getChatRoomId("one@email.com", "two@email.com", true);
        assertEquals(Optional.of("one@email.com_two@email.com"), chatRoomId);
    }

    @Test
    public void testGetAllChatRooms() {
        when(chatRoomRepository.findAll()).thenReturn(chatRoomList);
        List<ChatRoom> result = chatRoomService.getAllChatRooms();
        assertEquals(chatRoomList, result);
    }
}
