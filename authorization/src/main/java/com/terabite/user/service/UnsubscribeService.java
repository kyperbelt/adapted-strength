package com.terabite.user.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.user.UserApi;
import com.terabite.user.model.SubscriptionStatus;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UnsubscribeService {

    private static final Logger log = LoggerFactory.getLogger(SubscriptionService.class);

    private final UserRepository userRepository;
    private final LoginRepository loginRepository;

    public UnsubscribeService(UserRepository userRepository, LoginRepository loginRepository) {
        this.userRepository = userRepository;
        this.loginRepository = loginRepository;
    }

    public ResponseEntity<?> unsubscribe(String email) {
        UserInformation existingUser = userRepository.findByEmail(email).orElse(null);
        Login existingLogin = loginRepository.findByEmail(email).orElse(null);

        if (existingUser != null && existingLogin != null) {
            existingUser.setSubscriptionTier(SubscriptionStatus.NO_SUBSCRIPTION);
            existingUser.cancelExpirationDate();

            // Tricky solution for removing subscription roles in Login
            // Iterates through all roles of a given login, and removes all subscription related roles
            // TODO: We should eventually convert Login Roles to a Set instead of it being a list to simplify logic
            UserApi.ResetSubscriptionRoles(existingLogin);
            List<String> resetRoles = new ArrayList<>(List.copyOf(existingLogin.getRoles()));
            resetRoles.add("ROLE_" + SubscriptionStatus.NO_SUBSCRIPTION.name());
            existingLogin.setRoles(resetRoles);

            // Save the updated user
            userRepository.save(existingUser);
//            loginRepository.save(existingLogin); // TODO: No idea why this line throws. Still works without this line? Something to do with using setter

            log.info("Updated User Information: email={}, subscriptionTier={}", existingUser.getEmail(),
                    existingUser.getSubscriptionTier());
            return ResponseEntity.ok("Cancelled subscription successfully.");

        } else {
            return ResponseEntity.badRequest().body("No UserInformation or Login: " + email);
        }

    }
}
