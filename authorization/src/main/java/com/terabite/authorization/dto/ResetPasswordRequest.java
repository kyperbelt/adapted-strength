package com.terabite.authorization.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class ResetPasswordRequest {
    @JsonAlias("password")
    private String newPassword;
    @JsonAlias("reset_token")
    private String resetToken;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(final String resetToken) {
        this.resetToken = resetToken;
    }

}
