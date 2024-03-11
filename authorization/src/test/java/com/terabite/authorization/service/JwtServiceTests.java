package com.terabite.authorization.service;

import com.terabite.authorization.log.JwtValidationException;
import com.terabite.authorization.service.JwtService;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.junit.jupiter.api.BeforeEach;
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
        jwtService = new JwtService(SECRET2);
        assertFalse(jwtService.validateToken(token, userDetails));
    }

}
