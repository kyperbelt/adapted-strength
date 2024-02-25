package com.terabite.user.service;

import com.terabite.user.model.SubscriptionStatus;
import com.terabite.user.model.UnsubscribeRequest;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UnsubscribeService {

    private static final Logger log = LoggerFactory.getLogger(SubscriptionService.class);

    private final UserRepository userRepository;

    public UnsubscribeService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> unsubscribe(UnsubscribeRequest request) {
        UserInformation existingUser = userRepository.findByEmail(request.username()).orElse(null);

        if (existingUser != null) {
            existingUser.setSubscriptionTier(SubscriptionStatus.NO_SUBSCRIPTION);
            existingUser.cancelExpirationDate();

            // Save the updated user
            userRepository.save(existingUser);

            log.info("Updated User Information: email={}, subscriptionTier={}", existingUser.getEmail(),
                    existingUser.getSubscriptionTier());
            return ResponseEntity.ok("Subscription tier updated successfully.");

        } else {
            return ResponseEntity.badRequest().body("Failed to retrieve updated user information.");
        }

    }
}
