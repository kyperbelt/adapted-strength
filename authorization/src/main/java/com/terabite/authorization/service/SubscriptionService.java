package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.UserInformation;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.UserNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.authorization.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class SubscriptionService {

    public ResponseEntity<?> subscribe(UserInformation user, UserRepository userRepository) {
        try {
            // Retrieve the user information from the database
            UserInformation existingUser = userRepository.findById((int) user.getId())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            // Check if the user is logged in
            if (existingUser.getLogin().getLoginStatus() == LoginStatus.LOGGED_IN) {
                // Set the subscription tier (assuming you have a setSubscriptionTier method in UserInformation)
                existingUser.setSubscriptionTier(user.getSubscriptionTier());
                userRepository.save(existingUser);

                return ResponseEntity.ok(existingUser);
            } else {
                // User is not logged in, return an unauthorized response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body("User is not logged in.");
            }
        } catch (Exception e) {
            // Handle any other exceptions that might occur (e.g., database errors)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("Error processing the request.");
        }
    }
}