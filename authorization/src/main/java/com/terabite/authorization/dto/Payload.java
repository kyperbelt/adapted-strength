package com.terabite.authorization.dto;

// For debug/testing only. For verifying that controller methods are reached.
// Use Spring's Controller -> Service -> Repository pattern workflow for production.
public record Payload(String payload) { 
    public static final Payload EMPTY_PAYLOAD = new Payload("");

    public static Payload of(String payload) {
        return new Payload(payload);
    }

    public static Payload empty() {
        return EMPTY_PAYLOAD;
    }
}
