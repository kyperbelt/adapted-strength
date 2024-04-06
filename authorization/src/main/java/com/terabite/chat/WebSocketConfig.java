package com.terabite.chat;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    public static final String MESSAGE_PREFIX = "";

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // /user
        registry.enableSimpleBroker(MESSAGE_PREFIX + "/user");
        registry.setApplicationDestinationPrefixes(MESSAGE_PREFIX + "/app");
        // /user
        registry.setUserDestinationPrefix(MESSAGE_PREFIX + "/user");
    }

    // @Override
    // public void configureClientInboundChannel(ChannelRegistration registration){
    //     registration.interceptors(new ChannelInterceptor() {
    //         @Override
    //         public Message<?> preSend(Message<?> message, MessageChannel channel) {
    //             StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

    //             if(StompCommand.CONNECT.equals(accessor.getCommand())){
    //                 System.out.println("Connect ");
    //             } else if(StompCommand.SUBSCRIBE.equals(accessor.getCommand())){
    //                 System.out.println("Subscribe ");
    //                 System.out.println(String.format("\nMessage: %s\n Channel: %s\n", message, channel));
    //             } else if(StompCommand.SEND.equals(accessor.getCommand())){
    //                 System.out.println("Send message " );
    //             } else if(StompCommand.DISCONNECT.equals(accessor.getCommand())){
    //                 System.out.println("Exit ");
    //             } else {
    //             }
    //             return message;
    //         }
    //     });
    // }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // FIXME: This is a security risk. We should not allow all origins.
        registry.addEndpoint(MESSAGE_PREFIX + "/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
        DefaultContentTypeResolver resolver = new DefaultContentTypeResolver();
        resolver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);
        MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
        converter.setObjectMapper(new ObjectMapper());
        converter.setContentTypeResolver(resolver);
        messageConverters.add(converter);

        return false;
    }
}
