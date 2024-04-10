package com.terabite.user.repository;

import com.terabite.user.model.UserInformation;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.terabite.payment.model.Customer;


public interface UserRepository extends CrudRepository<UserInformation, Integer> {
        Optional <UserInformation> findById(long id);
        Optional<UserInformation> findByEmail(String email);
        Optional<UserInformation> findByCustomer(Customer customer);
}
