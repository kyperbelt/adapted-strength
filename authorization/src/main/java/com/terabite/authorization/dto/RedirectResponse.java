package com.terabite.authorization.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class RedirectResponse {
    private String redirectUrl;

    public RedirectResponse(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    public static ResponseEntity<RedirectResponse> of(String redirectUrl) {
        return ResponseEntity.status(HttpStatus.FOUND).body(new RedirectResponse(redirectUrl));
    }
}

