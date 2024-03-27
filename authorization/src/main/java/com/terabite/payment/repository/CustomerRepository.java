package com.terabite.payment.repository;

import org.springframework.data.repository.CrudRepository;

import com.terabite.payment.model.Customer;

public interface CustomerRepository extends CrudRepository<Customer, String>{
    
}
