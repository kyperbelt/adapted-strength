package com.terabite.user.service;

import com.terabite.user.model.SubscribeRequest;
import com.terabite.user.model.SubscriptionStatus;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.PreparedStatement;

@Service
public class SubscriptionService {
    private static final Logger log = LoggerFactory.getLogger(SubscriptionService.class);

    private final UserRepository userRepository;

    public SubscriptionService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> subscribe(SubscribeRequest request) {
        UserInformation existingUser = userRepository.findByEmail(request.username()).orElse(null);

        if (existingUser != null) {
            if(existingUser.getSubscriptionTier() != request.status()) {
                if(request.status() != SubscriptionStatus.NO_SUBSCRIPTION) {
                    existingUser.setSubscriptionTier(request.status());
                    existingUser.setExpirationDate();

                    // Save the updated user
                    userRepository.save(existingUser);

                    log.info("Updated User Information: email={}, subscriptionTier={}", existingUser.getEmail(),
                            existingUser.getSubscriptionTier());
                    return ResponseEntity.ok("Subscription tier updated successfully.");

                } else {
                    return ResponseEntity.badRequest().body("Must use UnsubscribeService to cancel subscription.");
                }
            } else {
                return ResponseEntity.badRequest().body("User is already subscribed as " + request.status());
            }
        } else {
            return ResponseEntity.badRequest().body("Failed to retrieve updated user information.");
        }
    }
}
