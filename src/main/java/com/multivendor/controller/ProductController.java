package com.multivendor.controller;

import com.multivendor.dto.ProductRequestDto;
import com.multivendor.dto.ProductResponseDto;
import com.multivendor.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * POST /api/products : Creates a new product under a vendor and category.
     */
    @PostMapping
    public ResponseEntity<ProductResponseDto> createProduct(@Valid @RequestBody ProductRequestDto requestDto) {
        ProductResponseDto createdProduct = productService.createProduct(requestDto);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    /**
     * GET /api/products/{id} : Retrieves single product details by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable Long id) {
        ProductResponseDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    /**
     * GET /api/products : Retrieves active products with pagination and sorting.
     * Example query parameters:
     * - /api/products?page=0&size=10
     * - /api/products?page=1&size=5&sort=price,asc
     * 
     * @PageableDefault sets default page to 0 and size to 10 if not provided by client.
     */
    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> getAllProducts(
            @PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ProductResponseDto> products = productService.getAllActiveProducts(pageable);
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/category/{categoryId} : Retrieves active products belonging to a category.
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponseDto>> getProductsByCategory(@PathVariable Long categoryId) {
        List<ProductResponseDto> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    /**
     * GET /api/products/vendor/{vendorId} : Retrieves products listed by a vendor.
     */
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<ProductResponseDto>> getProductsByVendor(@PathVariable Long vendorId) {
        List<ProductResponseDto> products = productService.getProductsByVendor(vendorId);
        return ResponseEntity.ok(products);
    }

    /**
     * PUT /api/products/{id} : Updates product details.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequestDto requestDto) {
        ProductResponseDto updatedProduct = productService.updateProduct(id, requestDto);
        return ResponseEntity.ok(updatedProduct);
    }

    /**
     * DELETE /api/products/{id} : Deactivates (soft delete) a product.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
