package com.terabite.payment.service;

import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
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
