package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.param.CustomerUpdateParams;
import com.terabite.payment.model.Customer;
import com.terabite.payment.repository.CustomerRepository;
import com.terabite.user.model.UserInformation;

@Service
public class CustomerService {
    CustomerRepository customerRepository;
    StripeCustomerService stripeCustomerService;

    public CustomerService(CustomerRepository customerRepository, StripeCustomerService stripeCustomerService){
        this.customerRepository = customerRepository;
        this.stripeCustomerService = stripeCustomerService;
    }


    public Customer createNewCustomer(UserInformation userInformation) throws StripeException{
        String customerId = stripeCustomerService.createNewCustomer(userInformation.getEmail());
        Customer customer = new Customer(customerId, userInformation);
        return customer;
    }

}
