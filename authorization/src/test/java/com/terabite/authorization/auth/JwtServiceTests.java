package com.terabite.authorization.auth;

import com.terabite.authorization.log.JwtValidationException;
import com.terabite.authorization.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class JwtServiceTests {

    private JwtService jwtService;

    @BeforeEach
    void setup() {
        jwtService = new JwtService();
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
        String actual = jwtService.extractUsername(token);

        assertEquals(expected, actual);
    }

    @Test
    void testExtractExpiration() {
        String token = jwtService.generateToken("testUser");
        Date now = new Date();
        Date expectedExpiration = new Date(System.currentTimeMillis() + 1000 * 60 * 1);

        Date expiration = jwtService.extractExpiration(token);
        assertNotNull(expiration);

        assertTrue(expiration.after(now));

        // Should always be true as token is generated before expectedExpiration is set as long as expiration times
        // are coordinated
        assertTrue(expiration.getTime() <= expectedExpiration.getTime());
    }


    @Test
    void testValidateToken() {
        // Mocking UserDetails. Unsure if spring introduces hidden behavior into spring specific classes; ignoring
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("testUser");

        String token = jwtService.generateToken("testUser");
        boolean valid = jwtService.validateToken(token, userDetails);
        assertTrue(valid);

        // New jwtService means a new secret. Tokens generated with old secret are always invalid
        jwtService = null;
        jwtService = new JwtService();
        assertThrows(JwtValidationException.class, () -> jwtService.validateToken(token, userDetails), "JwtValidationException should be thrown");
    }


}
