package com.multivendor.repository;

import com.multivendor.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * CartRepository handles database operations for Cart entities.
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    /**
     * Finds the shopping cart for a specific customer.
     */
    Optional<Cart> findByCustomerId(Long customerId);
}
