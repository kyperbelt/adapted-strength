package com.terabite.movement.repository;

import com.terabite.movement.model.Category;
import org.springframework.data.repository.CrudRepository;


public interface CategoryRepository extends CrudRepository<Category, Integer>
{
}