package com.terabite.notifications.repository;

import com.terabite.notifications.model.TokenInformation;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<TokenInformation, Integer> {

        Optional<TokenInformation> findByToken(String token);
}
