package com.terabite.movement.repository;

import com.terabite.movement.model.Movement;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MovementRepository extends CrudRepository<Movement, Integer>
{
    List<Movement> findByTitleContaining(String title);

    Movement findById(long id);
}