package com.multivendor.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Product entity represents an item listed for sale on the platform.
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer stock;

    /**
     * URL link to product showcase image.
     */
    @Column(length = 1000)
    private String imageUrl;

    /**
     * Plain boolean flag to mark active/inactive products (soft delete/availability).
     * Set to true by default.
     */
    @Column(nullable = false)
    private boolean active = true;

    /**
     * @ManyToOne: Many products can be owned by One Vendor.
     * @JoinColumn(name = "vendor_id"): Foreign key column in 'products' table.
     */
    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    /**
     * @ManyToOne: Many products can belong to One Category.
     * @JoinColumn(name = "category_id", nullable = false)
     */
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Default No-Argument Constructor
    public Product() {
    }

    public Product(String name, String description, Double price, Integer stock, String imageUrl, boolean active, Vendor vendor, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.active = active;
        this.vendor = vendor;
        this.category = category;
    }

    // --- Standard Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
