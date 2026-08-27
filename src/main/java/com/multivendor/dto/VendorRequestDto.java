package com.multivendor.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO for creating or updating a Vendor profile.
 */
public class VendorRequestDto {

    @NotBlank(message = "Business name cannot be blank")
    private String businessName;

    @NotNull(message = "User ID is required to link vendor profile to a user")
    private Long userId;

    public VendorRequestDto() {
    }

    public VendorRequestDto(String businessName, Long userId) {
        this.businessName = businessName;
        this.userId = userId;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
