package com.terabite.authorization.repository;

import com.terabite.authorization.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//not sure why but it wanted me to switch second parameter to String
public interface LoginRepository extends JpaRepository<Login, String> {
    Optional<Login> findByEmail(String email);

    //Optional <Login> findOneByEmail(String email);
    //Optional <Login> findOneByPasswordResetToken(String passwordResetToken);
    Login findOneByPasswordResetToken(String passwordResetToken);
    Login findOneByEmail(String email);
}
