package com.terabite.authorization.repository;

import com.terabite.authorization.model.Login;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface LoginRepository extends JpaRepository<Login, Long> {
    Optional <Login> findByEmail(String email);

    Optional <Login> findByPasswordResetToken(String passwordResetToken);

    void save(Optional<Login> login);

}
