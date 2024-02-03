package com.terabite.authorization.repository;

import com.terabite.authorization.model.UserInformation;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserInformation, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE UserInformation u SET u.subscriptionTier = :subscriptionTier WHERE u.login.email = :email")
    int updateSubscriptionTierByEmail(@Param("email") String email, @Param("subscriptionTier") int subscriptionTier);

    // For testing that the subscription updated successfully
    @Query("SELECT u FROM UserInformation u WHERE u.login.email = :email")
    Optional<UserInformation> findByLogin_Email(@Param("email") String email);
}
