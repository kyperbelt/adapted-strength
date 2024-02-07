package com.terabite.authorization.internal;

import org.apache.coyote.Response;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import static com.terabite.authorization.internal.Handler.Builder;

@Component
public class HandlerManager {
    
    @Bean
    public Handler<Void, ResponseEntity<?>> defaultHandler(){
        return new Builder<Void, ResponseEntity<?>>(arg -> {return new ResponseEntity<>(HttpStatus.OK); }).build();
    }
}
