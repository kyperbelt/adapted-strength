package com.terabite.authorization.repository;

import org.springframework.data.repository.CrudRepository;

import com.terabite.authorization.model.UserInformation;

public interface UserRepository extends CrudRepository<UserInformation, Integer>
{
}
