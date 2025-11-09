package com.terabite.movement.repository;

import com.terabite.movement.model.Movement;
import com.terabite.movement.model.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MovementRepository extends CrudRepository<Movement, Integer>
{
    List<Movement> findByTitleContaining(String title);
    List<Movement> findAllByOrderByTitleAsc();
    List<Movement> findByTitleContainingIgnoreCaseOrderByTitleAsc(String searchTerm);
    List<Movement> findByCategoriesOrderByTitleAsc(Category category);
    Movement findById(long id);
}