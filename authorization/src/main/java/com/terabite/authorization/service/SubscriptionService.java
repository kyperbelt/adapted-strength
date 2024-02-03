package com.terabite.authorization.service;

import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.model.SubscribeRequest;
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

    public ResponseEntity<?> subscribe(SubscribeRequest request) {
        if (loginRepository.findByEmail(request.username()).isPresent()) {
            log.info("Found email: {}", request.username());
            UserInformation existingUser = userRepository.findByLogin_Email(request.username()).orElse(null);

            if (existingUser != null && existingUser.getLogin() != null && existingUser.getLogin().getLoginStatus() == LoginStatus.LOGGED_IN) {
                existingUser.setSubscriptionTier(request.subscriptionTier());

                // Save the updated user
                userRepository.save(existingUser);

                // Fetch the updated user from the database
                existingUser = userRepository.findByLogin_Email(request.username()).orElse(null);

                if (existingUser != null) {
                    log.info("Updated User Information: email={}, subscriptionTier={}", existingUser.getLogin().getEmail(), existingUser.getSubscriptionTier());
                    return ResponseEntity.ok("Subscription tier updated successfully.");
                } else {
                    return ResponseEntity.badRequest().body("Failed to retrieve updated user information.");
                }
            } else {
                return ResponseEntity.badRequest().body("User is not logged in.");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found with the provided email.");
        }
    }
}
