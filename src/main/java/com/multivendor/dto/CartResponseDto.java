package com.multivendor.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO for returning Cart details in API responses.
 */
public class CartResponseDto {

    private Long id;
    private Long customerId;
    private String customerName;
    private List<ProductResponseDto> products = new ArrayList<>();
    private Double totalPrice;

    public CartResponseDto() {
    }

    public CartResponseDto(Long id, Long customerId, String customerName, List<ProductResponseDto> products, Double totalPrice) {
        this.id = id;
        this.customerId = customerId;
        this.customerName = customerName;
        this.products = products != null ? products : new ArrayList<>();
        this.totalPrice = totalPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<ProductResponseDto> getProducts() {
        return products;
    }

    public void setProducts(List<ProductResponseDto> products) {
        this.products = products;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
