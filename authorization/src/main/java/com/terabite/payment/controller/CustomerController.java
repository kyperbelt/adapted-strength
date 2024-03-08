package com.terabite.payment.controller;



import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.terabite.payment.model.CustomerInfo;
import com.terabite.payment.service.CustomerService;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/v1/customers")
public class CustomerController {
    private CustomerService customerService;
    // when should we create customers? During account creation? on subscribing?
    // could auto populate front end form with name, email, etc. from userinformation
    // would probably be better/safer to have them fill this info all in manually when they subscribe
    public CustomerController(CustomerService customerService){
        this.customerService=customerService;
    }


    @PostMapping("/create")
    public ResponseEntity<?> createNewCustomer(@RequestBody CustomerInfo customerInfo) throws StripeException{
        return customerService.createNewCustomer(customerInfo);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getCustomers() throws StripeException{
        return customerService.getAllCustomers();
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateExistingCustomer(@RequestBody Customer customer) {
        return customerService.updateExistingCustomer();
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCustomer(String customerId) throws StripeException{
        return customerService.deleteCustomer(customerId);
    }
    
    

}
