package com.terabite.movement.controller;

import com.terabite.movement.model.Category;
import com.terabite.movement.model.Movement;
import com.terabite.movement.repository.CategoryRepository;
import com.terabite.movement.repository.MovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/cat")
public class CategoryController
{
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository)
    {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createCategory(@RequestBody final Category category)
    {
        categoryRepository.save(category);
        return ResponseEntity.ok("Successfully added category.");
    }
}
