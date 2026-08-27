package com.multivendor.repository;

import com.multivendor.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * ProductRepository handles database operations for Product entities.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Finds all active products that customers can browse (unpaginated).
     */
    List<Product> findByActiveTrue();

    /**
     * Finds all active products with pagination support.
     * Pageable allows passing page number, page size, and sorting parameters.
     */
    Page<Product> findByActiveTrue(Pageable pageable);

    /**
     * Finds all active products under a specific category.
     */
    List<Product> findByCategoryIdAndActiveTrue(Long categoryId);

    /**
     * Finds all products listed by a specific vendor.
     */
    List<Product> findByVendorId(Long vendorId);
}
