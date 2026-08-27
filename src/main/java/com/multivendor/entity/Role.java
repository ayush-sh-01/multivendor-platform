package com.multivendor.entity;

/**
 * Role represents the user type in our system.
 * We have 3 simple roles:
 * - CUSTOMER: Can browse products, add to cart, and place orders.
 * - VENDOR: Can manage their own products.
 * - ADMIN: Can manage the entire platform.
 */
public enum Role {
    CUSTOMER,
    VENDOR,
    ADMIN
}
