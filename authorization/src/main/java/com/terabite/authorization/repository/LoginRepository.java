package com.terabite.authorization.repository;

import com.terabite.authorization.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LoginRepository extends JpaRepository<Login, Long> {
    Login findByEmail(String email);

    Login findByPasswordResetToken(String passwordResetToken);

}
