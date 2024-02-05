package com.terabite.user.repository;

import com.terabite.user.model.UserInformation;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserInformation, Integer> {

}
