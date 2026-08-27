package com.multivendor.dto;

/**
 * DTO for returning Vendor profile details in API responses.
 */
public class VendorResponseDto {

    private Long id;
    private String businessName;
    private Long userId;
    private String userName;
    private String userEmail;

    public VendorResponseDto() {
    }

    public VendorResponseDto(Long id, String businessName, Long userId, String userName, String userEmail) {
        this.id = id;
        this.businessName = businessName;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
