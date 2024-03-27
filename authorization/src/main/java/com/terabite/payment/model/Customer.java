package com.terabite.payment.model;

import com.terabite.user.model.UserInformation;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @NotNull
    private String id; //user email

    @OneToOne(mappedBy = "customer")
    @NotNull
    private UserInformation userInformation;

    private String subscriptionId;

    private String sessionId;

    public Customer(){
        
    }

    public Customer(String stripeCustomerId, UserInformation userInformation){
        this.id = stripeCustomerId;
        this.userInformation = userInformation;
    }

    public String getId() {
        return id;
    }

    public void setId(String customerId) {
        this.id = customerId;
    }

    public UserInformation getUserInformation() {
        return userInformation;
    }

    public void setUserInformation(UserInformation userInformation) {
        this.userInformation = userInformation;
    }

    public String getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
    
    

    

}
