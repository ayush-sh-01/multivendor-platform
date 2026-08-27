package com.multivendor.repository;

import com.multivendor.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * OrderRepository handles database operations for Order entities.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    /**
     * Finds all orders placed by a specific customer, ordered from newest to oldest.
     */
    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
}
