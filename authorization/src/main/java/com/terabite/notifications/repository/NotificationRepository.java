package com.terabite.notifications.repository;

import com.terabite.notifications.model.TokenInformation;

import java.util.Optional;

<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<TokenInformation, String> {
=======
import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends CrudRepository<TokenInformation, Integer> {
>>>>>>> main

        Optional<TokenInformation> findByToken(String token);
}
