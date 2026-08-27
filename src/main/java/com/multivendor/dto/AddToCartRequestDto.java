package com.multivendor.dto;

import jakarta.validation.constraints.NotNull;

/**
 * DTO for adding or removing a product from the shopping cart.
 */
public class AddToCartRequestDto {

    @NotNull(message = "Product ID is required")
    private Long productId;

    public AddToCartRequestDto() {
    }

    public AddToCartRequestDto(Long productId) {
        this.productId = productId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
