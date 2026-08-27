package com.multivendor.dto;

import jakarta.validation.constraints.NotNull;

/**
 * DTO for placing an order from the customer's shopping cart.
 */
public class OrderRequestDto {

    @NotNull(message = "Customer ID is required to place an order")
    private Long customerId;

    public OrderRequestDto() {
    }

    public OrderRequestDto(Long customerId) {
        this.customerId = customerId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
}
