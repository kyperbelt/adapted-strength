package com.terabite.authorization.service;

import com.terabite.authorization.model.ForgotPasswordToken;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.log.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.common.model.LoginDetails;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class LoginService implements UserDetailsService {

    final LoginRepository loginRepository;
    final PasswordEncoder passwordEncoder;
    final JwtService jwtService;

    private static Logger log = LoggerFactory.getLogger(LoginService.class);

    public LoginService(LoginRepository loginRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /**
     * Return a token if the login is successful, otherwise return none.
     *
     * @param login The login object that will be used to check if the user is able
     *              to login
     **/
    public Optional<String> login(final Login login) {
        Login storedLogin = loginRepository.findByEmail(login.getEmail()).orElse(null);

        if (storedLogin == null) {
            log.error("[Login] Could not find user with email: %s", login.getEmail());
            return Optional.empty();
        }

        String storedHash = storedLogin.getPassword();
        String password = login.getPassword();

        if (passwordEncoder.matches(password, storedHash)) {
            final String token = jwtService.generateToken(
                    new LoginDetails(storedLogin.getEmail(), storedLogin.getPassword(), storedLogin.getRoles()));
            return Optional.of(token);
        }

        return Optional.empty();
    }

    public void updatePasswordResetToken(ForgotPasswordToken token, String email) throws LoginNotFoundException {

        Login login = loginRepository.findOneByEmail(email);

        if (login != null) {
            login.setResetPasswordToken(token);
            loginRepository.save(login);
        } else {
            throw new LoginNotFoundException("Could not find a user with the token: " + token);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Login login = loginRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email + " email not found"));

        return LoginDetails.of(login.getEmail(), login.getPassword(), login.getRoles());
    }
}
