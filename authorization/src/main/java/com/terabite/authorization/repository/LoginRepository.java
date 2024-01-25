package com.terabite.authorization.repository;

import com.terabite.authorization.model.Login;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface LoginRepository extends JpaRepository<Login, Long> {
    //Optional <Login> findOneByEmail(String email);

    //Optional <Login> findOneByPasswordResetToken(String passwordResetToken);
    Login findOneByPasswordResetToken(String passwordResetToken);
    Login findOneByEmail(String email);
    void save(Optional<Login> login);

}
