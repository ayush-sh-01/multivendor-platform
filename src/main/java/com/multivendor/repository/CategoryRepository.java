package com.multivendor.repository;

import com.multivendor.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * CategoryRepository handles database operations for Category entities.
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * Finds a category by its name.
     */
    Optional<Category> findByName(String name);

    /**
     * Checks if a category name already exists to prevent duplicate categories.
     */
    boolean existsByName(String name);
}
