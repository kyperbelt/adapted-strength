package com.terabite.movement.controller;

import com.terabite.movement.model.Category;
import com.terabite.movement.model.Movement;
import com.terabite.movement.repository.CategoryRepository;
import com.terabite.movement.repository.MovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(allowCredentials = "true", origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/cat")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final MovementRepository movementRepository;

    public CategoryController(CategoryRepository categoryRepository, MovementRepository movementRepository) {
        this.categoryRepository = categoryRepository;
        this.movementRepository = movementRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = new ArrayList<Category>();

        categoryRepository.findAll().forEach(categories::add);

        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(categories, HttpStatus.OK);

    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") long id) {
        Category category = categoryRepository.findById(id);
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(category, HttpStatus.OK);
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

    @GetMapping("/categories/{category_id}/movements")
    public ResponseEntity<List<Movement>> getAllMovementsByCategoryId(@PathVariable("category_id") long id) {
        if (!categoryRepository.existsById((int) id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<Movement> movements = movementRepository.findMovementsByCategoriesId(id);
        return new ResponseEntity<>(movements, HttpStatus.OK);
    }


    @PostMapping("/movements/{movement_id}/categories")
    public ResponseEntity<Category> addCategory(@PathVariable("movement_id") long id, @RequestBody Category category) {
        Movement foundMovement = movementRepository.findById(id);
        if (foundMovement == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        Category foundCategory = categoryRepository.findByCategory(category.getCategory());
        if (foundCategory != null) {
            foundMovement.addCategory(foundCategory);
            movementRepository.save(foundMovement);
            return new ResponseEntity<>(foundCategory, HttpStatus.CREATED);
        }

        System.out.println(category.getMovements());
        foundMovement.addCategory(category);
        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") long id, @RequestBody Category category)
    {
        Category foundCategory = categoryRepository.findById(id);

        if(foundCategory == null)
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        foundCategory.setCategory(category.getCategory() != null ? category.getCategory() : foundCategory.getCategory());
        categoryRepository.save(foundCategory);
        return new ResponseEntity<>(foundCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/movements/{movement_id}/categories/{category_id}")
    public ResponseEntity<HttpStatus> deleteCategoryFromMovement(@PathVariable("movement_id") long movementId, @PathVariable("category_id") long categoryId)
    {
        Movement foundMovement = movementRepository.findById(movementId);

        if(foundMovement == null)
        {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        foundMovement.removeCategory(categoryId);
        movementRepository.save(foundMovement);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") long id)
    {
        categoryRepository.deleteById((int) id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
