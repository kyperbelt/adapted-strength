package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.chat.model.ChatUser;
import com.terabite.chat.model.UserType;
import com.terabite.chat.repository.ChatUserRepository;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import org.apache.catalina.User;
import org.apache.juli.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.LifecycleProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

// Preloads some users for testing login functionality
// For debug only
@Configuration
public class LoadLoginDatabase {
    private final Logger log = LoggerFactory.getLogger(LoadLoginDatabase.class);

    final PasswordEncoder passwordEncoder;

    public LoadLoginDatabase(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    private Object[] createUser(String firstName, String lastName, String email, String password, String[] roles) {
        Login login = new Login(email, passwordEncoder.encode(password));
        login.setRoles(Arrays.asList(roles));

        UserInformation userInformation = new UserInformation();
        userInformation.setFirstName(firstName);
        userInformation.setLastName(lastName);
        userInformation.setEmail(email);
        userInformation.setDateOfBirth(new Date(0,0,0));

        ChatUser chatUser = new ChatUser();
        chatUser.setFullName(firstName + " " + lastName);
        chatUser.setEmail(email);
        chatUser.setUserType(UserType.COACH);

        return new Object[] {login, userInformation, chatUser};
    }

    @Bean
    CommandLineRunner initLoginTable(LoginRepository loginRepository, UserRepository userRepository, ChatUserRepository chatUserRepository) {
        Object[] user = createUser("Alex", "Palting", "admin@email.com", "p@ssw0rd", new String[] {"ROLE_ADMIN", "ROLE_COACH"});

//        loginRepository.save((Login) user[0]);
//        userRepository.save((UserInformation) user[1]);
//        chatUserRepository.save((ChatUser) user[2]);

        return args -> log.info("Preloading " + loginRepository.findAll().stream()
                .map(Login::toString)
                .toList());
    }
}
