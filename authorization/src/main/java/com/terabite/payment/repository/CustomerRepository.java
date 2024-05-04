package com.terabite.payment.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.terabite.payment.model.Customer;
import com.terabite.user.model.UserInformation;

public interface CustomerRepository extends CrudRepository<Customer, String>{

    Optional<Customer> findByUserInformation(UserInformation userInformation);
    
}
