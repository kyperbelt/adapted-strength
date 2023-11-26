package com.terabite.authorization.repository;

import com.terabite.authorization.model.UserInformation;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserInformation, Integer>
{

}
