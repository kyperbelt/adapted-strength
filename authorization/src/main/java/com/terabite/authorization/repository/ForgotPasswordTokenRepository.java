package com.terabite.authorization.repository;
import com.terabite.authorization.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface ForgotPasswordTokenRepository extends JpaRepository<ForgotPasswordToken, Long>{
    Optional<ForgotPasswordToken> findByToken(String token);
}
