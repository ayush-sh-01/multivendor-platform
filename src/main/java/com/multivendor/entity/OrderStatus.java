package com.multivendor.entity;

/**
 * OrderStatus tracks the current lifecycle stage of a customer's order.
 */
public enum OrderStatus {
    PENDING,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
