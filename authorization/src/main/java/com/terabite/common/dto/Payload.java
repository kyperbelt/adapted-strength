package com.terabite.common.dto;

// For debug/testing only. For verifying that controller methods are reached.
// Use Spring's Controller -> Service -> Repository pattern workflow for production.
public record Payload(PayloadType type, String payload) { 
    public static final Payload EMPTY_PAYLOAD = new Payload(PayloadType.MESSAGE,"");

    public static Payload of(String payload) {
        return new Payload(PayloadType.MESSAGE,payload);
    }

    public static Payload of(PayloadType type, String payload) {
        return new Payload(type,payload);
    }

    public static Payload empty() {
        return EMPTY_PAYLOAD;
    }
}
