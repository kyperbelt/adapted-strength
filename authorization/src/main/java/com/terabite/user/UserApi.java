package com.terabite.user;

import com.terabite.user.repository.UserRepository;
import com.terabite.authorization.model.Login;
import com.terabite.common.Roles;
import com.terabite.user.model.SubscribeRequest;
import com.terabite.user.model.SubscriptionStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <h1>UserApi</h1>
 * <p>
 * This class will handle all user related operations such as
 * updating user information, deleting user information and getting user
 * information.
 *
 * <p>
 * Go through the UserApi class if you need to access user information from
 * another service
 * instead of directly accessing the user database or user related utilities.
 *
 * <p>
 * <p>
 * The reasoning behind this is that if we decide to split this application into
 * microservices,
 * we can easily change the UserApi class to make requests to the user service
 * instead of the user database, or
 * user related utilities.
 */
public class UserApi {
    private static final Logger log = LoggerFactory.getLogger(UserApi.class);

    private final UserRepository userRepository;

    public UserApi(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * This method will create the user information entry for the given username.
     *
     * This is to prevent an error from occuring when a user tries to get the
     * profile information,
     * but they have not created their profile yet.
     *
     * @param username The username of the user to create the information for.
     */
    public void createUserInformationForEmail(String username) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    /**
     * Subscription roles are an important subset of authorization roles that are
     * frequently changed.
     * <p>
     * </p>
     * This method iterates through all roles of the provided login, then it finds
     * and removes all subscription roles
     * described in `SubscriptionStatus`
     *
     * @param existingLogin the login object to strip subscription roles from
     */
    public static void ResetSubscriptionRoles(Login existingLogin) {
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

    /**
     * Subscription roles for Adapted Strength "add" on top of each other, with
     * higher tiered subscriptions inheriting
     * permissions from lower tier subscriptions. DOES NOT prevent duplicate roles
     * from being added to a `Login`. Combine
     * this method with `ResetSubscriptionRoles`
     * <p>
     * </p>
     * This means that setting a tier 3 subscription means the user will also have
     * tier 2 and tier 1 authorization.
     * For Adapted Strength, BASE_CLIENT, GENERAL_CLIENT, and SPECIFIC_CLIENT are
     * the tiers of subscriptions from
     * tier 1 to 3, respectively.
     *
     * @param request the `SubscribeRequest` object that contains the relevant
     *                `SubscriptionStatus` subscription tier
     * @return a valid subscription
     */
    public static List<String> getAdditiveRolesFromSubscribeRequest(SubscribeRequest request) {
        Optional<Roles> roleOption = Roles.getRoleByName("ROLE_"+request.status().name());

        if (roleOption.isEmpty() && request.status() != SubscriptionStatus.NO_SUBSCRIPTION) {
            log.error("Invalid subscription status: {}", request.status());
            return List.of();
        }


        final Roles role = roleOption.get();
        List<Roles> rolesList = new ArrayList<>();
        switch (role) {
            case ROLE_SPECIFIC_CLIENT:
                rolesList.add(Roles.ROLE_SPECIFIC_CLIENT);
            case ROLE_GENERAL_CLIENT:
                rolesList.add(Roles.ROLE_GENERAL_CLIENT);
            case ROLE_BASE_CLIENT:
                rolesList.add(Roles.ROLE_BASE_CLIENT);
            default:
                break;
        }
        return rolesList.stream().map(Roles::name).toList();
    }
}
