package com.multivendor.repository;

import com.multivendor.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OrderItemRepository handles database operations for individual order items.
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
