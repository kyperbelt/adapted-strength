package com.terabite.gateway.handling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.proxy.InvocationHandler;
import org.springframework.cglib.proxy.Proxy;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.servlet.tags.ArgumentTag;

import jakarta.servlet.http.HttpServletRequest;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.Arrays;

// import java.lang.IllegalArgumentException;

@FunctionalInterface
public interface ControllerHandler{

    // public ResponseEntity<?> execute(RequestEntity<?> request, HttpServletRequest servletRequest, Map<String, String> params);

    @Async
    CompletableFuture<ResponseEntity<?>> invoke(RequestEntity<?> request, HttpServletRequest servletRequest, Map<String, String> params);
        // return CompletableFuture.completedFuture(execute(request, servletRequest, params) );
    
        // return CompletableFuture.completedFuture(this.apply(request) );


        // Builder(S service){
        //     this.strategy = service::apply;
        // }

        // protected static <S> Builder<S> init(HandlingStrategy<RequestEntity<?>, ResponseEntity<?>> strategy){
        //     return new Builder<>(strategy);
        // }

		// protected static ControllerHandlerBuilder init(ControllerHandler strategy){
        //     return new ControllerHandlerBuilder(strategy);
        // }

        // protected static <S> Builder<S> init(S service){
        //     return new Builder<>(service);
        // }

        // protected ControllerHandlerBuilder addRequestPreinvocationMethod(Function<RequestEntity<String>, RequestEntity<String>> function) {
        //     this.handler = (ControllerHandler) handler.compose(function);
        //     // this.handler = handler.compose(function);
        //     return this;
        // }

        // protected Builder<T, R> addArgPreinvocationMethod(Function<String[], String[]> function) {
        //     this.handler = (HandlingStrategy<T, R>) handler.compose(function);
        //     // this.handler = handler.compose(function);
        //     return this;
        // }


        // protected Builder addPostinvocationMethod(Function<ResponseEntity<?>, ResponseEntity<?>> function){
        //     this.handler = (ControllerHandler) handler.andThen(function);
        //     return this;
        // }

        // protected ControllerHandler build(){
        //     return (ControllerHandler) Proxy.newProxyInstance(null, null, null) handler;
        // }
    // }
}
