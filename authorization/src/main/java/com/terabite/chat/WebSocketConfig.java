package com.terabite.chat;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.DefaultContentTypeResolver;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    public static final String MESSAGE_PREFIX = "/v1/chat";

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // /user
        registry.enableSimpleBroker(MESSAGE_PREFIX + "/chat/user");
        registry.setApplicationDestinationPrefixes(MESSAGE_PREFIX + "/app");
        // /user
        registry.setUserDestinationPrefix(MESSAGE_PREFIX + "/chat/user");
    }

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
