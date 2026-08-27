package com.multivendor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

/**
 * Cart entity represents a shopping cart belonging to a Customer.
 */
@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * @OneToOne: Each customer has their own dedicated shopping cart.
     */
    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false, unique = true)
    private User customer;

    /**
     * @ManyToMany: A Cart can have multiple Products, and a Product can be in multiple Carts.
     * @JoinTable: Defines the bridge/join table ('cart_products') that connects them in MySQL.
     * - joinColumns: Points to this entity (cart_id).
     * - inverseJoinColumns: Points to the related entity (product_id).
     */
    @ManyToMany
    @JoinTable(
        name = "cart_products",
        joinColumns = @JoinColumn(name = "cart_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products = new ArrayList<>();

    // Default No-Argument Constructor
    public Cart() {
    }

    public Cart(User customer) {
        this.customer = customer;
        this.products = new ArrayList<>();
    }

    // --- Standard Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
