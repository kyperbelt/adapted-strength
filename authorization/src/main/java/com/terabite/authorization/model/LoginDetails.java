package com.terabite.authorization.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * FIXME: Move into common package since it is used by all packages.
 */
public class LoginDetails implements UserDetails {
    private String email;
    private String password;
    private List<GrantedAuthority> authorities;
    private String jwtToken;

    public LoginDetails(Login login, String jwtToken) {
        this.email = login.getEmail();
        this.jwtToken = jwtToken;
        this.password = login.getPassword();
        this.authorities = login.getRoles().stream()
                .map((role) -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList());
    }

    public static LoginDetails of(Login login, String jwtToken) {
        return new LoginDetails(login, jwtToken);
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Collection<String> getRoles() {
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
