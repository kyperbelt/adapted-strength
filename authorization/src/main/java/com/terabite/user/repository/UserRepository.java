package com.terabite.user.repository;

import com.terabite.user.model.UserInformation;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserInformation, Integer> {

        Optional<UserInformation> findByEmail(String email);
}
