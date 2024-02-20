package com.terabite.authorization;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    // Allows all users for all routes.
    // CSRF disabled because it breaks authorization since backend is stateless
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                (authorizeHttpRequests) -> authorizeHttpRequests
                        .anyRequest()
                        .permitAll()
//                        .requestMatchers("/v1/auth/**").permitAll()
                        )
                .csrf(
                        (csrf) -> csrf.disable());
        return http.build();
    }
}
