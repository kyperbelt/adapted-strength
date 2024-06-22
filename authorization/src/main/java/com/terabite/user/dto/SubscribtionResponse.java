package com.terabite.user.dto;

import java.util.Date;

import com.terabite.common.SubscriptionStatus;

/**
 * SubscribtionResponse
 */
public record SubscribtionResponse(String email, SubscriptionStatus status, Date expiration, boolean autoRenew) {
}
