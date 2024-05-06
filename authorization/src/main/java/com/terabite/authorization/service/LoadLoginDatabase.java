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

    private Object[] createUser(String firstName, String lastName, String email, String password, String[] roles, UserType userType) {
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
        chatUser.setUserType(userType);

        return new Object[] {login, userInformation, chatUser};
    }

    @Bean
    CommandLineRunner initLoginTable(LoginRepository loginRepository, UserRepository userRepository, ChatUserRepository chatUserRepository) {
//        String names = "Kali, Liu, Pedro, Washington, Valerie, Ho, Morgan, Robinson, Nora, Yu, Bryant, Peterson, Caroline, Moore, Levi, Vaughn, Reign, Luna, Erick, Campbell";
//        String[] users = names.split(", ");
//        String[] clientRoles = new String[] {"ROLE_TERMS_ACCEPTED", "ROLE_BASE_CLIENT"};
//        for(int i = 0; i < users.length; i += 2) {
//            String firstName = users[i];
//            String lastName = users[i + 1];
//
//            Object[] newUser = createUser(firstName, lastName, String.format("%s@email.com", firstName + lastName), "password", clientRoles, UserType.CLIENT);
//
//            loginRepository.save((Login) newUser[0]);
//            userRepository.save((UserInformation) newUser[1]);
//            chatUserRepository.save((ChatUser) newUser[2]);
//        }
//
//
//
//        Object[] admin = createUser("Alex", "Palting", "admin@email.com", "p@ssw0rd", new String[] {"ROLE_ADMIN", "ROLE_COACH"}, UserType.COACH);
//        loginRepository.save((Login) admin[0]);
//        userRepository.save((UserInformation) admin[1]);
//        chatUserRepository.save((ChatUser) admin[2]);

        return args -> log.info("Preloading " + loginRepository.findAll().stream()
                .map(Login::toString)
                .toList());
    }
}
