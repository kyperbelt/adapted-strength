package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Subscription;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.SubscriptionUpdateParams;

@Service
public class StripeCustomerService {
    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    public StripeCustomerService(){
        
    }

    public String createNewCustomer(String email) throws StripeException{
        Stripe.apiKey = stripeKey;
        CustomerCreateParams params = CustomerCreateParams.builder()
        .setEmail(email)
        .build();
        Customer customer = Customer.create(params);
        return customer.getId();
    }

    public Subscription getSubscription(String subscriptionId) throws StripeException{
        Stripe.apiKey = stripeKey;
        Subscription subscription = Subscription.retrieve(subscriptionId);
        return subscription;
    }



}
