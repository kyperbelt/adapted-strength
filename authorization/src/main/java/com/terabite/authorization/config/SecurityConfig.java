package com.terabite.authorization.config;

import com.terabite.authorization.log.CustomAccessDeniedHandler;
import com.terabite.authorization.service.JwtService;
import com.terabite.authorization.service.LoginService;
import jakarta.servlet.DispatcherType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
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
import org.springframework.security.core.userdetails.UserDetailsService;
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
                        "/user/**",
                        "/chat/**",
                        "/programming/**",
        };
        private static final String[] PERMIT_ALL_ROUTES = {
                        "/auth/signup",
                        "/auth/login",
                        "/auth/verify", // TODO: verify email, we might want to add this at some point
                        "/auth/refresh", // to reset jwt token
                        "/auth/forgot_password",
                        "/auth/reset_password",
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
                                        // .requestMatchers("v1/auth/restricted_page").authenticated()
                                        // .requestMatchers("/v1/auth/change_role").authenticated()
                                        for (String route : AUTHENTICATED_ROUTES) {
                                                authorizeHttpRequests
                                                                .requestMatchers(String.format("/%s%s", VERSION_PREFIX,
                                                                                route))
                                                                .authenticated();
                                        }

                                        for (String route : PERMIT_ALL_ROUTES) {
                                                log.info("Permitting all for route: " + route);
                                                authorizeHttpRequests
                                                                .requestMatchers(String.format("/%s%s", VERSION_PREFIX,
                                                                                route))
                                                                .permitAll();
                                        }

                                        // authorizeHttpRequests.anyRequest().permitAll();
                                }
                                // .requestMatchers("/v1/auth/**").permitAll()
                                ).sessionManagement((sessionManagement) -> sessionManagement
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }
}
