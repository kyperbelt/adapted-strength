package com.terabite.user.model;

public record SubscribeRequest(String email, SubscriptionStatus status) {
}
