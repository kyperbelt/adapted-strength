package com.terabite.user.dto;

import java.util.Date;

import com.terabite.common.SubscriptionStatus;

/**
 * SubscribtionRequest
 * 
 */
public record SubscribtionRequest(SubscriptionStatus status, Date expiration) {
}
