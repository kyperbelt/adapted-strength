package com.terabite.authorization.service;

import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {

    private static final Logger log = LoggerFactory.getLogger(SubscriptionService.class);

    private final LoginRepository loginRepository;
    private final UserRepository userRepository;

    public SubscriptionService(LoginRepository loginRepository, UserRepository userRepository) {
        this.loginRepository = loginRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResponseEntity<?> subscribe(UserInformation userInformation) {
        // Get the user's email from the provided user information
        String userEmail = userInformation.getLogin().getEmail();

        // Check if the email exists in the LoginRepository
        if (loginRepository.findByEmail(userEmail).isPresent()) {
            // The user exists, update the subscription tier
            int updatedRows = userRepository.updateSubscriptionTierByEmail(userEmail, userInformation.getSubscriptionTier());

            if (updatedRows > 0) {
                // Subscription tier updated successfully
                log.info("Subscription tier updated successfully for user with email: {}", userEmail);

                // Retrieve the updated user information
                UserInformation updatedUser = userRepository.findByLogin_Email(userEmail).orElse(null);
                if (updatedUser != null) {
                    log.info("Updated User Information: email={}, subscriptionTier={}", updatedUser.getLogin().getEmail(), updatedUser.getSubscriptionTier());
                } else {
                    log.warn("Unable to retrieve updated user information.");
                }

                return ResponseEntity.ok("Subscription tier updated successfully.");
            } else {
                // Failed to update subscription tier
                return ResponseEntity.badRequest().body("Failed to update subscription tier.");
            }
        } else {
            // User not found, return an error response
            return ResponseEntity.badRequest().body("User not found with the provided email.");
        }
    }
}
