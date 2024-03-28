package com.terabite.authorization.service;

import com.terabite.common.model.LoginDetails;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTests {

    private static final String SECRET1 = Base64.getEncoder()
            .encodeToString(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());
    private static final String SECRET2 = Base64.getEncoder()
            .encodeToString(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());
    private static final long EXPIRATION = 1000 * 60 * 60 * 24;
    private JwtService jwtService;


    @BeforeEach
    void setup() {
        jwtService = new JwtService(SECRET1, EXPIRATION);
        System.out.println("Secret1: " + SECRET1);
        System.out.println("Secret2: " + SECRET2);


    }

    @Test
    void testGenerateToken() {
        String token = jwtService.generateToken("bob");
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void testExtractUsername() {
        String expected = "testUser";
        String token = jwtService.generateToken(expected);
        Optional<String> actual = jwtService.extractUsername(token);
        assertTrue(actual.isPresent());

        assertEquals(expected, actual.get());
    }

    @Test
    void testExtractExpiration() {
        String token = jwtService.generateToken("testUser");
        Date now = new Date();
        Date expectedExpiration = new Date(System.currentTimeMillis() + EXPIRATION);

        Date expiration = jwtService.extractExpiration(token);
        assertNotNull(expiration);

        assertTrue(expiration.after(now));

        // Should always be true as token is generated before expectedExpiration is set
        // as long as expiration times
        // are coordinated
        assertTrue(expiration.getTime() <= expectedExpiration.getTime());
    }

    @Test
    void testValidateToken() {
        // Mocking UserDetails. Unsure if spring introduces hidden behavior into spring
        // specific classes; ignoring
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("testUser");

        String token = jwtService.generateToken("testUser");
        boolean valid = jwtService.validateToken(token, userDetails);
        assertTrue(valid);

        // New jwtService means a new secret. Tokens generated with old secret are
        // always invalid
        jwtService = null;
        jwtService = new JwtService(SECRET2, EXPIRATION);
        assertFalse(jwtService.validateToken(token, userDetails));
    }

    @Nested
    class testTokenInvalidation {
        LoginDetails loginDetails;

        @BeforeEach
        void setup() {
            loginDetails = mock(LoginDetails.class);
            when(loginDetails.getUsername()).thenReturn("testUser");
            when(loginDetails.getRoles()).thenReturn(null);
        }

        @Test
        void testInvalidateToken() {
            jwtService = new JwtService(SECRET1, EXPIRATION);
            String token = jwtService.generateToken(loginDetails);
            boolean valid = jwtService.validateToken(token, loginDetails);

            // Token is valid, and nothing is in the blacklist
            assertTrue(valid);
            assertEquals(0, jwtService.getTokenBlacklist().size());

            jwtService.invalidateToken(token);
//            jwtService.getTokenBlacklist().put(token, true);
//            System.out.println(jwtService.getTokenBlacklist().asMap());

            // Token is now invalid, and is in the blacklist
            assertEquals(1, jwtService.getTokenBlacklist().size());
        }

        @Test
        void testTokenBlacklistEviction() {
            jwtService = new JwtService(SECRET1, 0);

            // TODO: have a control for preventing spam token invalidation
            for (int i = 0; i < 5; i++) {
                System.out.println(jwtService.getTokenBlacklist().asMap());
                String token = jwtService.generateToken(loginDetails);

                // Token is invalid, put in blacklist
                jwtService.invalidateToken(token);
            }

            // Value should be 1, despite 5 tokens being invalidated.
            // This is because the blacklist internally "cleans up" after every modifying action
            // This means that the added tokens are immediately evicted after being added
            assertEquals(0, jwtService.getTokenBlacklist().size());
        }
    }
}
