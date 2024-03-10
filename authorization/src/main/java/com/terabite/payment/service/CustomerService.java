package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerListParams;
import com.stripe.param.CustomerUpdateParams;

@Service
public class CustomerService {
    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    public CustomerService(){
        
    }

    public Customer createNewCustomer(String name, String email) throws StripeException{
        Stripe.apiKey = stripeKey;
        CustomerCreateParams params = CustomerCreateParams.builder()
        .setName(name).setEmail(email)
        .build();
        Customer customer = Customer.create(params);
        return customer;
    }

    public Customer updateExistingCustomer(String name, String email, String customerId) throws StripeException{
        Stripe.apiKey = stripeKey;
        Customer resource = Customer.retrieve(customerId);
        CustomerUpdateParams params = CustomerUpdateParams.builder()
        .setName(name)
        .setEmail(email)
        .build();
        Customer customer = resource.update(params);
        return customer;
    }
}
