package com.terabite.user;

import com.terabite.authorization.model.Login;
import com.terabite.user.model.SubscribeRequest;
import com.terabite.common.SubscriptionStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserApiTest {

    Login login;

    @BeforeEach
    void setUp() {
        login = new Login("test@email.com", "password");
        login.setRoles(new ArrayList<>());
    }

    @Test
    void testResetSubscriptionRoles() {
        // Add all subscription roles
        for (SubscriptionStatus s : SubscriptionStatus.values()) {
            login.getRoles().add("ROLE_" + s.name());
        }

        // Add a non-subscription role
        login.getRoles().add("ROLE_USER");

        // All added roles should be present
        assertEquals(SubscriptionStatus.values().length + 1, login.getRoles().size());

        // Should remove all roles except for non-subscription roles
        UserApi.ResetSubscriptionRoles(login);

        // The remaining role should be the non-subscription role
        int expected = 1;
        int result = login.getRoles().size();
        assertEquals(expected, result);
    }

    @Nested
    class testGetAdditiveRolesFromSubscribeRequest {
        SubscribeRequest tierOne;
        SubscribeRequest tierTwo;
        SubscribeRequest tierThree;

        @BeforeEach
        void setUp() {
            tierOne = new SubscribeRequest(SubscriptionStatus.BASE_CLIENT);
            tierTwo = new SubscribeRequest(SubscriptionStatus.GENERAL_CLIENT);
            tierThree = new SubscribeRequest(SubscriptionStatus.SPECIFIC_CLIENT);
        }

        @Test
        void tierOneTest() {
            List<String> roleList = UserApi.getAdditiveRolesFromSubscribeRequest(tierOne);

            // Should only add first tier role
            int expected = 1;
            int result = roleList.size();
            assertEquals(expected, result);
        }

        @Test
        void tierTwoTest() {
            List<String> roleList = UserApi.getAdditiveRolesFromSubscribeRequest(tierTwo);

            // Should add first and second tier roles
            int expected = 2;
            int result = roleList.size();
            assertEquals(expected, result);
        }

        @Test
        void tierThreeTest() {
            List<String> roleList = UserApi.getAdditiveRolesFromSubscribeRequest(tierThree);

            // Should add first, second, and third tier roles
            int expected = 3;
            int result = roleList.size();
            assertEquals(expected, result);
        }
    }
}
