package com.terabite.user.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.user.model.SubscribeRequest;
import com.terabite.user.model.SubscriptionStatus;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SubscriptionService {
    private static final Logger log = LoggerFactory.getLogger(SubscriptionService.class);

    private final UserRepository userRepository;

    private final LoginRepository loginRepository;

    public SubscriptionService(UserRepository userRepository, LoginRepository loginRepository) {
        this.userRepository = userRepository;
        this.loginRepository = loginRepository;
    }

    public ResponseEntity<?> subscribe(SubscribeRequest request, String email) {
        UserInformation existingUser = userRepository.findByEmail(email).orElse(null);
        Login existingLogin = loginRepository.findByEmail(email).orElse(null);

        if (existingUser != null) {
            if (existingUser.getSubscriptionTier() != request.status()) {
                if (hasPaidSubscriptionRole(request)) {
                    existingUser.setSubscriptionTier(request.status());
                    existingUser.setExpirationDate();


                    try {
//                        existingLogin.getRoles().add("ROLE_" + request.status().toString());

                        // Clearing existing roles, because they're additive
                        ResetSubscriptionRoles(existingLogin);

                        // "Additive" subscription logic
                        // Higher subscription tiers give all lower tier benefits
                        // Implementing this behavior by adding lower level roles for higher level subscriptions
                        List<String> roles = new ArrayList<>();
                        switch (request.status().toString()) {
                            case "BASE_CLIENT" -> {
                                roles.add("ROLE_BASE_CLIENT");
                            }
                            case "GENERAL_CLIENT" -> {
                                roles.add("ROLE_BASE_CLIENT");
                                roles.add("ROLE_GENERAL_CLIENT");
                            }
                            case "SPECIFIC_CLIENT" -> {
                                roles.add("ROLE_BASE_CLIENT");
                                roles.add("ROLE_GENERAL_CLIENT");
                                roles.add("ROLE_SPECIFIC_CLIENT");
                            }
                        }

                        existingLogin.setRoles(roles);
                    } catch (Exception e) {
                        log.error("Login " + existingLogin + " has a null role list");
                    }

                    // Save the updated user
                    userRepository.save(existingUser);
//                    loginRepository.save(existingLogin); // TODO: No idea why this throws. Works without this line. Something to do with using a repository setter

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

    static void ResetSubscriptionRoles(Login existingLogin) {
        List<String> roles = existingLogin.getRoles();
        List<String> filteredRoles = roles.stream()
                .filter(role -> {
                    String strippedRole = role.substring(5); // Remove "ROLE_" prefix for comparison
                    return Arrays.stream(SubscriptionStatus.values())
                            .noneMatch(s -> s.name().equals(strippedRole));
                })
                .toList();
        existingLogin.setRoles(filteredRoles);
    }


    // Beginning move away from enum logic
    private boolean hasPaidSubscriptionRole(SubscribeRequest request) {
        // Placeholder logic to simulate a payment status check
        // For example, return true if subscription tier is not NO_SUBSCRIPTION
        // This is purely for demonstration; replace it with real Stripe API call logic later

        return request.status() != SubscriptionStatus.NO_SUBSCRIPTION;
    }
}
