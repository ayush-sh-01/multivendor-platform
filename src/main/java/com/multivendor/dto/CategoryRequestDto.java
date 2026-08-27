package com.multivendor.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for creating or updating a Category.
 */
public class CategoryRequestDto {

    @NotBlank(message = "Category name cannot be blank")
    private String name;

    private String description;

    public CategoryRequestDto() {
    }

    public CategoryRequestDto(String name, String description) {
        this.name = name;
        this.description = description;
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
}
