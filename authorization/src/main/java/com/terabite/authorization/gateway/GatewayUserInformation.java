package com.terabite.authorization.gateway;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.terabite.authorization.service.UserInformation;

public class GatewayUserInformation extends Gateway
{
    private UserInformation userInformation;

    public UserInformation getUserInformation() {
        return userInformation;
    }

    @JsonProperty("payload")
    public void setUserInformation(UserInformation userInformation) {
        this.userInformation = userInformation;
    }
}
