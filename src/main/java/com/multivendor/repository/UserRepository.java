package com.multivendor.repository;

import com.multivendor.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * UserRepository handles database operations for User entities.
 * JpaRepository provides built-in methods: save(), findById(), findAll(), deleteById(), etc.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their email address.
     * Spring Data JPA automatically writes the SQL query:
     * "SELECT * FROM users WHERE email = ?"
     */
    Optional<User> findByEmail(String email);

    /**
     * Checks if a user already exists with this email address.
     * Returns true if exists, false otherwise.
     */
    boolean existsByEmail(String email);
}
