package com.multivendor.service;

import com.multivendor.dto.CategoryRequestDto;
import com.multivendor.dto.CategoryResponseDto;
import com.multivendor.entity.Category;
import com.multivendor.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * Creates a new category ensuring no duplicate names.
     */
    public CategoryResponseDto createCategory(CategoryRequestDto requestDto) {
        if (categoryRepository.existsByName(requestDto.getName())) {
            throw new RuntimeException("Category '" + requestDto.getName() + "' already exists.");
        }

        Category category = new Category();
        category.setName(requestDto.getName());
        category.setDescription(requestDto.getDescription());

        Category savedCategory = categoryRepository.save(category);
        return mapToResponseDto(savedCategory);
    }

    /**
     * Retrieves category by ID.
     */
    public CategoryResponseDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return mapToResponseDto(category);
    }

    /**
     * Retrieves all categories.
     */
    public List<CategoryResponseDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryResponseDto> responseList = new ArrayList<>();
        for (Category category : categories) {
            responseList.add(mapToResponseDto(category));
        }
        return responseList;
    }

    /**
     * Updates an existing category.
     */
    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto requestDto) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        if (!category.getName().equalsIgnoreCase(requestDto.getName()) && categoryRepository.existsByName(requestDto.getName())) {
            throw new RuntimeException("Category name '" + requestDto.getName() + "' is already in use.");
        }

        category.setName(requestDto.getName());
        category.setDescription(requestDto.getDescription());

        Category updatedCategory = categoryRepository.save(category);
        return mapToResponseDto(updatedCategory);
    }

    /**
     * Deletes a category by ID.
     */
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }

    // --- Private Helper Method for Manual Mapping ---

    private CategoryResponseDto mapToResponseDto(Category category) {
        return new CategoryResponseDto(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }
}
