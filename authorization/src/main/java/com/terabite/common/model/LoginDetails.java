package com.terabite.common.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class LoginDetails implements UserDetails {
    private String email;
    private String password;
    private List<GrantedAuthority> authorities;

    public LoginDetails(final String email, final String password, final List<String> roles) {
        this.email = email;
        this.password = password;
        this.authorities = roles.stream()
                .map((role) -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList());
    }

    public static LoginDetails of(String email, String password, List<String> roles) {
        return new LoginDetails(email, password, roles);
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
