
package com.terabite.authorization.config;

import com.terabite.authorization.log.CustomAccessDeniedHandler;
import com.terabite.authorization.service.LoginService;
import jakarta.servlet.DispatcherType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
        private static final String VERSION_PREFIX = "v1";
        private static final String[] AUTHENTICATED_ROUTES = {
                        // "/auth/**",
                        "/auth/logout",
                        "/user/create",
                        "/user/profile",
                        "/user/subscribe",
                        "/user/unsubscribe",
                        "/chat/**",
                        "/programming/**",
        };

        private final JwtAuthFilter jwtAuthFilter;

        private static Logger log = LoggerFactory.getLogger(SecurityConfig.class);

        public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
                this.jwtAuthFilter = jwtAuthFilter;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationProvider authenticationProvider(@Lazy final LoginService loginService) {
                DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
                authenticationProvider.setUserDetailsService(loginService);
                authenticationProvider.setPasswordEncoder(passwordEncoder());
                return authenticationProvider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
                        throws Exception {
                return authenticationConfiguration.getAuthenticationManager();
        }

        // Allows all users for all routes.
        // CSRF disabled because it breaks authorization since backend is stateless
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http, @Lazy final AuthenticationProvider authProvider)
                        throws Exception {
                http.csrf((csrf) -> csrf.disable())
                                .exceptionHandling((exceptionHandler) -> exceptionHandler
                                                .accessDeniedHandler(new CustomAccessDeniedHandler()))
                                .authorizeHttpRequests((authorizeHttpRequests) -> {
                                        authorizeHttpRequests
                                                        .dispatcherTypeMatchers(DispatcherType.ERROR,
                                                                        DispatcherType.FORWARD)
                                                        .permitAll();
                                        for (String route : AUTHENTICATED_ROUTES) {
                                                authorizeHttpRequests
                                                                .requestMatchers(String.format("/%s%s", VERSION_PREFIX,
                                                                                route))
                                                                .authenticated();
                                        }
                                        authorizeHttpRequests.anyRequest().permitAll();
                                }).sessionManagement((sessionManagement) -> sessionManagement
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }
}
