package com.multivendor.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * @Entity: Tells JPA and Hibernate that this class maps to a database table.
 * @Table: Specifies the name of the table in MySQL ("users").
 */
@Entity
@Table(name = "users")
public class User {

    /**
     * @Id: Marks this field as the Primary Key of the table.
     * @GeneratedValue(strategy = GenerationType.IDENTITY): 
     * MySQL will automatically generate and increment this ID (AUTO_INCREMENT).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * @Column: Configures column details like nullable, unique, or length.
     */
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    /**
     * @Enumerated(EnumType.STRING): 
     * Stores the enum as a plain string in MySQL ("CUSTOMER", "VENDOR", "ADMIN")
     * rather than an integer index (0, 1, 2).
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Default No-Argument Constructor (Required by JPA/Hibernate)
    public User() {
    }

    // Constructor with fields for convenience
    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
