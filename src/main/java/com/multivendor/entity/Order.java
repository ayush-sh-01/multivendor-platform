package com.multivendor.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Order entity represents an entire customer purchase order.
 */
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * @ManyToOne: Many orders can be placed by One Customer (User).
     * @JoinColumn(name = "customer_id"): Foreign key in 'orders' table pointing to 'users'.
     */
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    /**
     * @Enumerated(EnumType.STRING): Stores the order status as readable text ("PENDING", "CONFIRMED", etc.)
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * @OneToMany: One Order contains multiple OrderItem lines.
     * mappedBy = "order": Tells JPA that the 'order' field in OrderItem owns this relationship.
     * cascade = CascadeType.ALL: Saving, updating, or deleting an Order automatically cascades to all its OrderItems.
     */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    // Default No-Argument Constructor
    public Order() {
    }

    public Order(User customer, OrderStatus status, Double totalAmount, LocalDateTime createdAt) {
        this.customer = customer;
        this.status = status;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
        this.orderItems = new ArrayList<>();
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

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
