package com.multivendor.service;

import com.multivendor.dto.CartResponseDto;
import com.multivendor.dto.ProductResponseDto;
import com.multivendor.entity.Cart;
import com.multivendor.entity.Product;
import com.multivendor.entity.User;
import com.multivendor.repository.CartRepository;
import com.multivendor.repository.ProductRepository;
import com.multivendor.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /**
     * Gets or creates a cart for the specified customer.
     */
    public Cart getOrCreateCartEntity(Long customerId) {
        return cartRepository.findByCustomerId(customerId).orElseGet(() -> {
            User customer = userRepository.findById(customerId)
                    .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));
            Cart newCart = new Cart(customer);
            return cartRepository.save(newCart);
        });
    }

    /**
     * Retrieves customer's cart as a DTO.
     */
    public CartResponseDto getCartByCustomerId(Long customerId) {
        Cart cart = getOrCreateCartEntity(customerId);
        return mapToResponseDto(cart);
    }

    /**
     * Adds an active product to the customer's cart.
     */
    public CartResponseDto addProductToCart(Long customerId, Long productId) {
        Cart cart = getOrCreateCartEntity(customerId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        if (!product.isActive()) {
            throw new RuntimeException("Product '" + product.getName() + "' is currently inactive.");
        }

        if (product.getStock() <= 0) {
            throw new RuntimeException("Product '" + product.getName() + "' is out of stock.");
        }

        cart.getProducts().add(product);
        Cart updatedCart = cartRepository.save(cart);
        return mapToResponseDto(updatedCart);
    }

    /**
     * Removes a product from the customer's cart.
     */
    public CartResponseDto removeProductFromCart(Long customerId, Long productId) {
        Cart cart = getOrCreateCartEntity(customerId);

        boolean removed = false;
        for (int i = 0; i < cart.getProducts().size(); i++) {
            if (cart.getProducts().get(i).getId().equals(productId)) {
                cart.getProducts().remove(i);
                removed = true;
                break;
            }
        }

        if (!removed) {
            throw new RuntimeException("Product with id: " + productId + " was not in the cart.");
        }

        Cart updatedCart = cartRepository.save(cart);
        return mapToResponseDto(updatedCart);
    }

    /**
     * Clears all products from the customer's cart.
     */
    public CartResponseDto clearCart(Long customerId) {
        Cart cart = getOrCreateCartEntity(customerId);
        cart.getProducts().clear();
        Cart savedCart = cartRepository.save(cart);
        return mapToResponseDto(savedCart);
    }

    // --- Private Helper Method for Manual Mapping ---

    private CartResponseDto mapToResponseDto(Cart cart) {
        List<ProductResponseDto> productDtos = new ArrayList<>();
        double totalPrice = 0.0;

        for (Product product : cart.getProducts()) {
            totalPrice += product.getPrice();
            productDtos.add(new ProductResponseDto(
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
            ));
        }

        return new CartResponseDto(
                cart.getId(),
                cart.getCustomer().getId(),
                cart.getCustomer().getName(),
                productDtos,
                totalPrice
        );
    }
}
