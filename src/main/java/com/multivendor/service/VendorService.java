package com.multivendor.service;

import com.multivendor.dto.VendorRequestDto;
import com.multivendor.dto.VendorResponseDto;
import com.multivendor.entity.Role;
import com.multivendor.entity.User;
import com.multivendor.entity.Vendor;
import com.multivendor.repository.UserRepository;
import com.multivendor.repository.VendorRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class VendorService {

    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    public VendorService(VendorRepository vendorRepository, UserRepository userRepository) {
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
    }

    /**
     * Creates a Vendor profile for an existing user who has the VENDOR role.
     */
    public VendorResponseDto createVendor(VendorRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + requestDto.getUserId()));

        if (user.getRole() != Role.VENDOR) {
            throw new RuntimeException("User must have the role 'VENDOR' to create a vendor profile.");
        }

        if (vendorRepository.existsByUserId(requestDto.getUserId())) {
            throw new RuntimeException("A vendor profile already exists for user id: " + requestDto.getUserId());
        }

        Vendor vendor = new Vendor();
        vendor.setBusinessName(requestDto.getBusinessName());
        vendor.setUser(user);

        Vendor savedVendor = vendorRepository.save(vendor);
        return mapToResponseDto(savedVendor);
    }

    /**
     * Retrieves a vendor profile by vendor ID.
     */
    public VendorResponseDto getVendorById(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));
        return mapToResponseDto(vendor);
    }

    /**
     * Retrieves all vendor profiles.
     */
    public List<VendorResponseDto> getAllVendors() {
        List<Vendor> vendors = vendorRepository.findAll();
        List<VendorResponseDto> responseList = new ArrayList<>();
        for (Vendor vendor : vendors) {
            responseList.add(mapToResponseDto(vendor));
        }
        return responseList;
    }

    /**
     * Updates vendor business name.
     */
    public VendorResponseDto updateVendor(Long id, VendorRequestDto requestDto) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));

        vendor.setBusinessName(requestDto.getBusinessName());

        Vendor updatedVendor = vendorRepository.save(vendor);
        return mapToResponseDto(updatedVendor);
    }

    /**
     * Deletes a vendor profile.
     */
    public void deleteVendor(Long id) {
        if (!vendorRepository.existsById(id)) {
            throw new RuntimeException("Vendor not found with id: " + id);
        }
        vendorRepository.deleteById(id);
    }

    // --- Private Helper Method for Manual Mapping ---

    private VendorResponseDto mapToResponseDto(Vendor vendor) {
        return new VendorResponseDto(
                vendor.getId(),
                vendor.getBusinessName(),
                vendor.getUser().getId(),
                vendor.getUser().getName(),
                vendor.getUser().getEmail()
        );
    }
}
