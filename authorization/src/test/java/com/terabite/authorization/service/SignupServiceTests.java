package com.terabite.authorization.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.terabite.authorization.dto.AuthRequest;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginDetails;
import com.terabite.authorization.repository.LoginRepository;

@ExtendWith(MockitoExtension.class)
public class SignupServiceTests{
    @Mock
    private LoginRepository loginRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;

    @Mock
    private Login login;
        
    @InjectMocks
    private SignupService signupService;

    @BeforeEach 
    void setup(){

    }

    @Test
    void testVerifyPasswordIsStrong(){
        String password = "password";
        boolean result = signupService.verifyPasswordIsStrong(password);
        assertFalse(result);

        String password2 = "Password#123";
        boolean result2 = signupService.verifyPasswordIsStrong(password2);
        assertTrue(result2);
    }

    @Test
    void testSignupWithAlreadyExitingUser(){
        final String email ="existing_user@gmail.com";

        when(loginRepository.findByEmail(email)).thenReturn(Optional.of(new Login()));
        Optional<String> result = signupService.signup(new AuthRequest(email, "password"));
        assertFalse(result.isPresent());
    }

    @Test 
    void testSignupWithNewUser(){
        final String email = "new_user@gmail.com";
        final String password = "password";

        when(loginRepository.findByEmail(email)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(password)).thenReturn("encoded_password");
        when(jwtService.generateToken(ArgumentMatchers.any(LoginDetails.class))).thenReturn("token");

        Optional<String> result = signupService.signup(new AuthRequest(email, password));
        assertTrue(result.isPresent());

    }

}

