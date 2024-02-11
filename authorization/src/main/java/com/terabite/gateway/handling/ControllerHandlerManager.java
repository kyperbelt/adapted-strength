package com.terabite.gateway.handling;

import java.lang.reflect.Proxy;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.aop.framework.ProxyFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;

import java.util.concurrent.CompletableFuture;
import java.util.Arrays;

import java.lang.reflect.Method;
import java.util.Map;

@Configuration
public class ControllerHandlerManager {

    @Bean
    public ControllerHandler defaultHandler() throws NoSuchMethodException, SecurityException{
        return buildBean(new Dummy(), "dummy");
    }

    static class Dummy{
        public ResponseEntity<?> dummy(){
            return new ResponseEntity<>("dummy", HttpStatus.OK);
        }
    }

    private static <T> ControllerHandler buildBean(T serviceObject, String methodName, Class<?>... argTypes) throws NoSuchMethodException, SecurityException{
        // Check Preconditions
        if(argTypes.length > 3) throw new IllegalArgumentException("argTypes can have at most 3 parameters");
        for(Class<?> clazz : argTypes) {
            if (clazz == Map.class); else if (clazz == RequestEntity.class); else if (clazz == HttpServletRequest.class);
            else throw new IllegalArgumentException("argTypes must one of Map, RequestEntity, or ServletRequest");
        }

        // Resolve service method to use and create dynamic proxy
        Method serviceMethod = resolveMethod(serviceObject.getClass(), methodName, argTypes);
        ProxyFactory proxyFactory = new ProxyFactory(ControllerHandler.class, new MethodInterceptor() {

			@Override
			public Object invoke(MethodInvocation invocation) throws Throwable {
			    Object[] args = invocation.getArguments();
                Object[] callArray = new Object[argTypes.length];
                Arrays.setAll(callArray, i -> {
                for(int j = 0; j < args.length; j++)
                    if(args[j].getClass() == argTypes[i]) return args[j];
                return null;} );
                return CompletableFuture.completedFuture(serviceMethod.invoke(serviceObject, callArray) );
			}
        });

        return (ControllerHandler) proxyFactory.getProxy();
    }
}