package com.terabite.movement.repository;

import com.terabite.movement.model.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface CategoryRepository extends CrudRepository<Category, Integer>
{
    List<Category> findByCategoryContaining(String category);

    Category findByCategory(String category);

    List<Category> findCategoriesByMovementsId(long id);
}