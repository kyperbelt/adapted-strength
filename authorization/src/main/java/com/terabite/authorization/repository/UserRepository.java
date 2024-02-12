package com.terabite.authorization.repository;

import com.terabite.authorization.model.UserInformation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserInformation, Integer> {
    @Query("SELECT u FROM UserInformation u WHERE u.login.email = :email")
    Optional<UserInformation> findByLogin_Email(@Param("email") String email);

}
