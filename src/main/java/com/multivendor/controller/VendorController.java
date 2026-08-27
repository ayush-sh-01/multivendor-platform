package com.multivendor.controller;

import com.multivendor.dto.VendorRequestDto;
import com.multivendor.dto.VendorResponseDto;
import com.multivendor.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    private final VendorService vendorService;

    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    /**
     * POST /api/vendors : Creates a vendor profile.
     */
    @PostMapping
    public ResponseEntity<VendorResponseDto> createVendor(@Valid @RequestBody VendorRequestDto requestDto) {
        VendorResponseDto createdVendor = vendorService.createVendor(requestDto);
        return new ResponseEntity<>(createdVendor, HttpStatus.CREATED);
    }

    /**
     * GET /api/vendors/{id} : Retrieves vendor details by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<VendorResponseDto> getVendorById(@PathVariable Long id) {
        VendorResponseDto vendor = vendorService.getVendorById(id);
        return ResponseEntity.ok(vendor);
    }

    /**
     * GET /api/vendors : Retrieves all vendor profiles.
     */
    @GetMapping
    public ResponseEntity<List<VendorResponseDto>> getAllVendors() {
        List<VendorResponseDto> vendors = vendorService.getAllVendors();
        return ResponseEntity.ok(vendors);
    }

    /**
     * PUT /api/vendors/{id} : Updates vendor business name.
     */
    @PutMapping("/{id}")
    public ResponseEntity<VendorResponseDto> updateVendor(@PathVariable Long id, @Valid @RequestBody VendorRequestDto requestDto) {
        VendorResponseDto updatedVendor = vendorService.updateVendor(id, requestDto);
        return ResponseEntity.ok(updatedVendor);
    }

    /**
     * DELETE /api/vendors/{id} : Deletes a vendor profile.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }
}
