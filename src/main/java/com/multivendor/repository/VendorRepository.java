package com.multivendor.repository;

import com.multivendor.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * VendorRepository handles database operations for Vendor entities.
 */
@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    /**
     * Finds the vendor profile associated with a specific user ID.
     */
    Optional<Vendor> findByUserId(Long userId);

    /**
     * Checks if a vendor profile already exists for a user ID.
     */
    boolean existsByUserId(Long userId);
}
