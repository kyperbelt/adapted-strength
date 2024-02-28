package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginDetails;
import com.terabite.authorization.log.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
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
        // Temp, will change to jwt in near future
        // Current implementation only checks for correct password and assigns state
        // Has some edge case checking
        // README: See signup service for more detaisl on where else we will need jwt
        // tokens.

        Login storedLogin = loginRepository.findByEmail(login.getEmail()).orElse(null);

        if (storedLogin == null) {
            log.error("[Login] Could not find user with email: %s", login.getEmail());
            return Optional.empty();
        }

        String storedHash = storedLogin.getPassword();
        String password = login.getPassword();

        if (passwordEncoder.matches(password, storedHash)) {
            final String token = jwtService.generateToken(new LoginDetails(storedLogin));
            return Optional.of(token);
        }

        return Optional.empty();
    }

    public void updatePasswordResetToken(String token, String email) throws LoginNotFoundException {

        // Optional<Login> login=loginRepository.findOneByEmail(email);
        Login login = loginRepository.findOneByEmail(email);

        if (login != null) {
            // login.orElseThrow().setResetPasswordToken(token);
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

        return new LoginDetails(login);

        // Optional<Login> loginDetail = loginRepository.findByEmail(email);
        //
        // return loginDetail.map(login -> new LoginDetails(login))
        // .orElseThrow(() -> new LoginNotFoundException(email + " email not found"));
    }
}
