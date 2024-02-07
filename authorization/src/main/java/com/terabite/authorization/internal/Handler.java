package com.terabite.authorization.internal;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

@FunctionalInterface
public interface Handler<T, R> extends Function<T, ResponseEntity<R>>{

    @Async
    default CompletableFuture<ResponseEntity<R>> invoke(T request){
        return CompletableFuture.completedFuture(this.apply(request) );
    }

    static class Builder<T, R> {
        private Handler<T, R> handler;

        protected Builder(Handler<T, R> handler){
            this.handler = handler;
        }

        // Builder(S service){
        //     this.strategy = service::apply;
        // }

        // protected static <S> Builder<S> init(HandlingStrategy<RequestEntity<?>, ResponseEntity<?>> strategy){
        //     return new Builder<>(strategy);
        // }

        protected static <T, R> Builder<T, R> init(Handler<T, R> strategy){
            return new Builder<>(strategy);
        }

        // protected static <S> Builder<S> init(S service){
        //     return new Builder<>(service);
        // }

        protected Builder<T, R> addPreinvocationMethod(Function<T, T> function) {
            this.handler = (Handler<T, R>) handler.compose(function);
            // this.handler = handler.compose(function);
            return this;
        }

        protected Builder<T, R> addPostinvocationMethod(Function<ResponseEntity<R>, ResponseEntity<R>> function){
            this.handler = (Handler<T, R>) handler.andThen(function);
            return this;
        }

        protected Handler<T, R> build(){
            return handler;
        }
    }
}
