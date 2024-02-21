package com.terabite.authorization.service;

import com.terabite.authorization.model.Login;
import com.terabite.authorization.model.LoginDetails;
import com.terabite.authorization.model.LoginStatus;
import com.terabite.authorization.repository.LoginNotFoundException;
import com.terabite.authorization.repository.LoginRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class LoginService implements UserDetailsService {


    LoginRepository loginRepository;

    PasswordEncoder passwordEncoder;

    private static Logger log = LoggerFactory.getLogger(LoginService.class);

//    public LoginService(LoginRepository loginRepository, PasswordEncoder passwordEncoder) {
//        this.loginRepository = loginRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Autowired
    public void setLoginRepository(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @Autowired
    public void setPasswordEncoder(@Lazy PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Return a token if the login is successful, otherwise return none.
     *
     * @param login The login object that will be used to check if the user is able
     *              to login
     **/
    @Deprecated
    public Optional<String> login(final Login login) {
        // Temp, will change to jwt in near future
        // Current implementation only checks for correct password and assigns state
        // Has some edge case checking
        // README: See signup service for more detaisl on where else we will need jwt
        // tokens.

        Login storedLogin = loginRepository.findByEmail(login.getEmail()).orElse(null);
        if (storedLogin == null) {
            return Optional.empty();
        }


        String storedHash = storedLogin.getPassword();
        String password = login.getPassword();


        // README: taking out the login status for testing purposes
        // but I think we should allow multiple devices to be logged in at the same
        // time.See README comments below.
        if (passwordEncoder.matches(password, storedHash)) {
            // FIX: Took out for testing purposes-> `&& storedLogin.getLoginStatus() ==
            // LoginStatus.LOGGED_OUT) {`

            // Good password and not yet logged in
            storedLogin.setLoginStatus(LoginStatus.LOGGED_IN);
            loginRepository.save(storedLogin);

            return Optional.of(String.format("authorized:%s-%s", storedLogin.getEmail(), storedLogin.getLoginStatus()));
        } else if (storedLogin.getLoginStatus() == LoginStatus.LOGGED_IN) {
            // Weird case for attempted log in, but user is already logged in
            //
            // README: We should allow login from multiple devices
            // I imagine that we dont want to log people out of their other devices or force
            // them to log in again on their phones for example, if they logged in on their
            // computer.
            // Something we should discuss as a group.
            login.setLoginStatus(LoginStatus.LOGGED_IN);

            // Bad logins return what's sent
            // return ResponseEntity.status(HttpStatus.FORBIDDEN)
            // .contentType(MediaType.APPLICATION_JSON)
            // .body(login);
            return Optional.empty();
        } else {
            // Bad password, not logged in
            // README: Again, same as above - we might want to allow multiple devices to be
            // logged in at the same time
            // so a failed login attempt on one device should not logout the user from
            // another device.
            // I have a suspicion that once we setup JWT this will be handled automatically.
            login.setLoginStatus(LoginStatus.LOGGED_OUT);

            // Bad logins return what's sent
            // return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            // .contentType(MediaType.APPLICATION_JSON)
            // .body(login);
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
                .orElseThrow(() -> new LoginNotFoundException(email + " email not found"));

        return new LoginDetails(login);

//        Optional<Login> loginDetail = loginRepository.findByEmail(email);
//
//        return loginDetail.map(login -> new LoginDetails(login))
//                .orElseThrow(() -> new LoginNotFoundException(email + " email not found"));
    }
}
