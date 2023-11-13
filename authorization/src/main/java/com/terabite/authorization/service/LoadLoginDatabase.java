package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Preloads some users for testing login functionality
// For debug only
@Configuration
public class LoadLoginDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadLoginDatabase.class);

    @Bean
    CommandLineRunner initLoginTable(LoginRepository loginRepository) {

        Login testLogin = new Login("example@email.com", "p@ssw0rd");
        loginRepository.save(testLogin);


        return args -> {
            log.info("Preloading " + loginRepository.findAll().stream()
                    .map(Login::toString)
                    .toList());
        };
    }
}
