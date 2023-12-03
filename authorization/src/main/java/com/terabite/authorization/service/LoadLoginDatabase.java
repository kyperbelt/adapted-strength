package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

// Preloads some users for testing login functionality
// For debug only
@Configuration
public class LoadLoginDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadLoginDatabase.class);

    final PasswordEncoder passwordEncoder;

    public LoadLoginDatabase(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initLoginTable(LoginRepository loginRepository) {

//        Login testLogin = new Login("example@email.com", "p@ssw0rd");
        Login testLogin = new Login("example@email.com", passwordEncoder.encode("p@ssw0rd"));
        loginRepository.save(testLogin);


        return args -> log.info("Preloading " + loginRepository.findAll().stream()
                .map(Login::toString)
                .toList());
    }
}
