package com.terabite.notifications.repository;

import com.terabite.notifications.model.TokenInformation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<TokenInformation, String> {

        Optional<TokenInformation> findByToken(String token);
        Optional<TokenInformation> findById(long id);
}
