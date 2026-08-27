package com.multivendor.service;

import com.multivendor.dto.ProductRequestDto;
import com.multivendor.dto.ProductResponseDto;
import com.multivendor.entity.Category;
import com.multivendor.entity.Product;
import com.multivendor.entity.Vendor;
import com.multivendor.repository.CategoryRepository;
import com.multivendor.repository.ProductRepository;
import com.multivendor.repository.VendorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final VendorRepository vendorRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, VendorRepository vendorRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.vendorRepository = vendorRepository;
        this.categoryRepository = categoryRepository;
    }

    /**
     * Creates a new product for a vendor under a specific category.
     */
    public ProductResponseDto createProduct(ProductRequestDto requestDto) {
        Vendor vendor = vendorRepository.findById(requestDto.getVendorId())
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + requestDto.getVendorId()));

        Category category = categoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + requestDto.getCategoryId()));

        Product product = new Product();
        product.setName(requestDto.getName());
        product.setDescription(requestDto.getDescription());
        product.setPrice(requestDto.getPrice());
        product.setStock(requestDto.getStock());
        product.setImageUrl(requestDto.getImageUrl());
        product.setActive(true);
        product.setVendor(vendor);
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        return mapToResponseDto(savedProduct);
    }

    /**
     * Retrieves a single product by ID.
     */
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return mapToResponseDto(product);
    }

    /**
     * Retrieves all active products available in the store (unpaginated).
     */
    public List<ProductResponseDto> getAllActiveProducts() {
        List<Product> products = productRepository.findByActiveTrue();
        List<ProductResponseDto> responseList = new ArrayList<>();
        for (Product product : products) {
            responseList.add(mapToResponseDto(product));
        }
        return responseList;
    }

    /**
     * Retrieves active products with pagination (page number, page size, sort).
     */
    public Page<ProductResponseDto> getAllActiveProducts(Pageable pageable) {
        Page<Product> productPage = productRepository.findByActiveTrue(pageable);
        return productPage.map(this::mapToResponseDto);
    }

    /**
     * Retrieves active products filtered by Category ID.
     */
    public List<ProductResponseDto> getProductsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new RuntimeException("Category not found with id: " + categoryId);
        }
        List<Product> products = productRepository.findByCategoryIdAndActiveTrue(categoryId);
        List<ProductResponseDto> responseList = new ArrayList<>();
        for (Product product : products) {
            responseList.add(mapToResponseDto(product));
        }
        return responseList;
    }

    /**
     * Retrieves all products belonging to a specific Vendor ID.
     */
    public List<ProductResponseDto> getProductsByVendor(Long vendorId) {
        if (!vendorRepository.existsById(vendorId)) {
            throw new RuntimeException("Vendor not found with id: " + vendorId);
        }
        List<Product> products = productRepository.findByVendorId(vendorId);
        List<ProductResponseDto> responseList = new ArrayList<>();
        for (Product product : products) {
            responseList.add(mapToResponseDto(product));
        }
        return responseList;
    }

    /**
     * Updates an existing product.
     */
    public ProductResponseDto updateProduct(Long id, ProductRequestDto requestDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        Category category = categoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + requestDto.getCategoryId()));

        product.setName(requestDto.getName());
        product.setDescription(requestDto.getDescription());
        product.setPrice(requestDto.getPrice());
        product.setStock(requestDto.getStock());
        if (requestDto.getImageUrl() != null && !requestDto.getImageUrl().isBlank()) {
            product.setImageUrl(requestDto.getImageUrl());
        }
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);
        return mapToResponseDto(updatedProduct);
    }

    /**
     * Deactivates (soft delete) a product by setting active = false.
     */
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        product.setActive(false);
        productRepository.save(product);
    }

    // --- Private Helper Method for Manual Mapping ---

    private ProductResponseDto mapToResponseDto(Product product) {
        return new ProductResponseDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl(),
                product.isActive(),
                product.getVendor().getId(),
                product.getVendor().getBusinessName(),
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }
}
