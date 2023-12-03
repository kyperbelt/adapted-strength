package com.terabite.authorization.service;

import com.terabite.authorization.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {
    public ResponseEntity<?> updateSubscription (long userId, int tier, UserRepository memberRepository) {

        return null;
    }

}
