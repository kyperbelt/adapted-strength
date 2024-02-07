// package com.terabite.authorization.internal;

// import org.springframework.http.RequestEntity;
// import org.springframework.http.ResponseEntity;

// import java.util.function.Function;

// @FunctionalInterface
// public interface HandlingStrategy<T, R> extends Function<RequestEntity<T>, ResponseEntity<R>>{    

//     static class Builder<T, R> {
//         private HandlingStrategy<T, R> strategy;

//         private Builder(HandlingStrategy<T, R> strategy){
//             this.strategy = strategy;
//         }

//         // Builder(S service){
//         //     this.strategy = service::apply;
//         // }

//         // protected static <S> Builder<S> init(HandlingStrategy<RequestEntity<?>, ResponseEntity<?>> strategy){
//         //     return new Builder<>(strategy);
//         // }

//         protected static <T, R> Builder<T, R> init(HandlingStrategy<T, R> strategy){
//             return new Builder<>(strategy);
//         }

//         // protected static <S> Builder<S> init(S service){
//         //     return new Builder<>(service);
//         // }

//         protected Builder<T, R> addPreinvocationMethod(Function<RequestEntity<T>, RequestEntity<T>> otherStrategy) {
//             this.strategy = (HandlingStrategy<T, R>) strategy.compose(otherStrategy);
//             return this;
//         }

//         protected Builder<T, R> addPostinvocationMethod(Function<ResponseEntity<R>, ResponseEntity<R>> otherStrategy){
//             this.strategy = (HandlingStrategy<T, R>) strategy.andThen(otherStrategy);
//             return this;
//         }

//         protected HandlingStrategy<T, R> get(){
//             return strategy;
//         }
//     }


// }
