package com.terabite.authorization.model;

// For debug/testing only. For verifying that controller methods are reached.
// Use Spring's Controller -> Service -> Repository pattern workflow for production.
public record Payload(String payload) { }
