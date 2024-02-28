package com.terabite.authorization.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.terabite.GlobalConfiguration;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class CookieMonsterService {

    private final String authCookieName;
    private final String domainUrl;

    public CookieMonsterService( @Qualifier(GlobalConfiguration.BEAN_NAME_AUTH_COOKIE_NAME) String authCookieName, @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_URL) final String domainUrl) {
        this.authCookieName = authCookieName;
        this.domainUrl = domainUrl;
    }

    public Cookie createAuthorizationCookie(String value, int maxAge) {
        Cookie newCookie = new Cookie(authCookieName, value);
        newCookie.setPath("/");
        newCookie.setMaxAge(maxAge);
        newCookie.setDomain(domainUrl);
        return newCookie;
    }
    
     
    public Cookie emptyAuthorizationCookie() {
        Cookie newCookie = new Cookie(authCookieName, "");
        newCookie.setPath("/");
        newCookie.setMaxAge(0);
        newCookie.setDomain(domainUrl);
        return newCookie;
    }

    public Optional<Cookie> getAuthCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return Optional.empty();
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(authCookieName)) {
                return Optional.of(cookie);
            }
        }
        return Optional.empty();
    }
}
