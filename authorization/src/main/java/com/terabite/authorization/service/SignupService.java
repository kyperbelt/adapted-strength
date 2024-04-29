package com.terabite.authorization.service;

import com.terabite.authorization.dto.AuthRequest;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.common.Roles;
import com.terabite.common.model.LoginDetails;
import com.terabite.user.model.SubscriptionStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SignupService {
    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private static final Logger log = LoggerFactory.getLogger(SignupService.class);


    public SignupService(LoginRepository loginRepository, PasswordEncoder passwordEncoder, final JwtService jwtService) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public boolean verifyPasswordIsStrong(String password) {
        boolean hasUppercase = !password.equals(password.toLowerCase());
        boolean hasLowercase = !password.equals(password.toUpperCase());
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecial = password.matches(".*[!@#$%^&*].*");
        boolean isLongEnough = password.length() >= 8;
        return hasUppercase && hasLowercase && hasDigit && isLongEnough && hasSpecial;
    }

    public Optional<String> signup(AuthRequest authRequest) {

        if (loginRepository.findByEmail(authRequest.getUsername()).isEmpty()) {
            String plaintextPassword = authRequest.getPassword();
            authRequest.setPassword(passwordEncoder.encode(plaintextPassword));

            Login login = new Login();
            login.setEmail(authRequest.getUsername());
            login.setPassword(authRequest.getPassword());

            // Adding No Subscription role here
            String roleNoSub = "ROLE_" + SubscriptionStatus.NO_SUBSCRIPTION.name();
            login.setRoles(List.of(Roles.ROLE_USER.name(), Roles.ROLE_TERMS_ACCEPTED.name(), roleNoSub));

            loginRepository.save(login);

            final String token = jwtService.generateToken(LoginDetails.of(login.getEmail(), login.getPassword(), login.getRoles()));
            log.info("User {} has signed up", login.getEmail());
            return Optional.of(token);

        } else {
            log.info("User {} already exists", authRequest.getUsername());
            return Optional.empty();
        }
    }
}
