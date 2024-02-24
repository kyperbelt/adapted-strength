package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

// Preloads some users for testing login functionality
// For debug only
@Configuration
public class LoadLoginDatabase {
    private final Logger log = LoggerFactory.getLogger(LoadLoginDatabase.class);

    final PasswordEncoder passwordEncoder;

    public LoadLoginDatabase(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initLoginTable(LoginRepository loginRepository) {

//        Login testLogin = new Login("example@email.com", "p@ssw0rd");
        Login testLogin = new Login("admin@email.com", passwordEncoder.encode("p@ssw0rd"));

        List<String> roles = new ArrayList<>();
        roles.add("ROLE_ADMIN");
        testLogin.setRoles(roles);
        loginRepository.save(testLogin);


        return args -> log.info("Preloading " + loginRepository.findAll().stream()
                .map(Login::toString)
                .toList());
    }
}
