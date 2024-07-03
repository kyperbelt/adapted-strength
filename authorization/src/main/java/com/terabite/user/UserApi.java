package com.terabite.user;

import com.terabite.authorization.model.Login;
import com.terabite.common.Roles;
import com.terabite.common.SubscriptionStatus;
import com.terabite.user.model.SubscribeRequest;
import com.terabite.user.model.UserInformation;
import com.terabite.user.model.UserProgramming;
import com.terabite.user.repository.UserProgrammingRepository;
import com.terabite.user.repository.UserRepository;
import com.terabite.user.service.SubscriptionService;
import com.terabite.user.service.UnsubscribeService;
import com.terabite.user.service.UserProgrammingService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
    private final UserProgrammingRepository userProgrammingRepository;
    private final UnsubscribeService unsubscribeService;
    private final SubscriptionService subscriptionService;
    private final UserProgrammingService userProgrammingService;

    public UserApi(UserRepository userRepository,
                   UserProgrammingRepository userProgrammingRepository,
                   UnsubscribeService unsubscribeService,
                   SubscriptionService subscriptionService,
                   UserProgrammingService userProgrammingService) {
        this.userRepository = userRepository;
        this.userProgrammingRepository = userProgrammingRepository;
        this.unsubscribeService = unsubscribeService;
        this.subscriptionService = subscriptionService;
        this.userProgrammingService = userProgrammingService;
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
     * Return all userProgrammings for the given Program ID
     *
     * @param programId the ID of the program to get all users for
     * @return a list of all userProgrammings for the given program ID
     */
    public List<UserProgramming> getAllUsersForProgram(long programId) {
        return userProgrammingRepository.findByAssignedProgramId(programId);
    }

    /**
     * Delete all user programmings associated with the given programID.
     *
     * @param programId - program id to remove user programming for.
     * @return return the number of {@link UserProgramming}s that were deleted.
     */
    public int deleteAllUserProgrammingsForProgram(long programId) {
        final List<UserProgramming> userProgrammingsToDelete = getAllUsersForProgram(programId);
        for (UserProgramming userProgramming : userProgrammingsToDelete) {
            userProgrammingService.removeProgramming(userProgramming.getId());
        }

        log.info("Removed {} user programs associated with programId: {}", userProgrammingsToDelete.size(), programId);
        return userProgrammingsToDelete.size();
    }

    /**
     * Set the subscription for the specified user and set the expiration to the
     * given expiration date.
     *
     * @param userId             - the userID is usually their email.
     * @param subscriptionStatus - the {@link SubscriptionStatus} (BASE_CLIENT,
     *                           SPECIFIC_CLIENT)
     * @param expiration         - when is the expiration set to expire.
     * @return whether the subscription operation was successful or not.
     */
    public boolean
    setUserSubscription(final String userId, final SubscriptionStatus subscriptionStatus, final Date expiration) {
        final Optional<UserInformation> userOption = userRepository.findByEmail(userId);
        if (userOption.isEmpty()) {
            log.error("Tried and Failed to set subscruption for user with email '{}' that did not exist in "
                      + "userInformationTable",
                      userId);
            return false;
        }
        final UserInformation user = userOption.get();

        switch (subscriptionStatus) {
            case NO_SUBSCRIPTION:
                unsubscribeService.unsubscribe(userId);
                user.setExpirationDate(null);
                userRepository.save(user);
                return true;
            case SPECIFIC_CLIENT:
            case BASE_CLIENT:
                subscriptionService.subscribe(new SubscribeRequest(subscriptionStatus), userId);
                user.setExpirationDate(expiration);
                userRepository.save(user);
                return true;
            default:
                log.error("'{}' Subscription not supported", subscriptionStatus.name());
                break;
        }
        // unable to set user Subscription
        return false;
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
        List<String> filteredRoles =
            roles.stream()
                .filter(role -> {
                    String strippedRole = role.substring(5); // Remove "ROLE_" prefix for comparison
                    return Arrays.stream(SubscriptionStatus.values()).noneMatch(s -> s.name().equals(strippedRole));
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
        Optional<Roles> roleOption = Roles.getRoleByName("ROLE_" + request.status().name());

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
