package com.terabite.movement.controller;

import com.terabite.movement.model.Category;
import com.terabite.movement.model.Movement;
import com.terabite.movement.repository.CategoryRepository;
import com.terabite.movement.repository.MovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/cat")
public class CategoryController
{
    private final CategoryRepository categoryRepository;
    private final MovementRepository movementRepository;

    public CategoryController(CategoryRepository categoryRepository, MovementRepository movementRepository)
    {
        this.categoryRepository = categoryRepository;
        this.movementRepository = movementRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories()
    {
        List<Category> categories = new ArrayList<Category>();

        categoryRepository.findAll().forEach(categories::add);

        if(categories.isEmpty())
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(categories, HttpStatus.OK);

    }

    @GetMapping("/movements/{movement_id}/categories")
    public ResponseEntity<List<Category>> getALlCategoriesByMovementId(@PathVariable("movement_id") long id) {
        Movement foundMovement = movementRepository.findById(id);
        if (foundMovement == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<Category> categories = categoryRepository.findCategoriesByMovementsId(id);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping("/movements/{movement_id}/categories")
    public ResponseEntity<Category> addCategory(@PathVariable("movement_id") long id, @RequestBody Category category)
    {
        Movement foundMovement = movementRepository.findById(id);
        if(foundMovement == null)
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        Category foundCategory = categoryRepository.findByCategory(category.getCategory());
        if(foundCategory != null)
        {
            foundMovement.addCategory(foundCategory);
            movementRepository.save(foundMovement);
            return new ResponseEntity<>(foundCategory, HttpStatus.CREATED);
        }

        System.out.println(category.getMovements());
        foundMovement.addCategory(category);
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }
}
