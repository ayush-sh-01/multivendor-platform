package com.multivendor.controller;

import com.multivendor.dto.AddToCartRequestDto;
import com.multivendor.dto.CartResponseDto;
import com.multivendor.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * GET /api/cart/{customerId} : Retrieves the customer's current shopping cart and total price.
     */
    @GetMapping("/{customerId}")
    public ResponseEntity<CartResponseDto> getCart(@PathVariable Long customerId) {
        CartResponseDto cart = cartService.getCartByCustomerId(customerId);
        return ResponseEntity.ok(cart);
    }

    /**
     * POST /api/cart/{customerId}/items : Adds a product to the customer's cart.
     */
    @PostMapping("/{customerId}/items")
    public ResponseEntity<CartResponseDto> addProductToCart(
            @PathVariable Long customerId,
            @Valid @RequestBody AddToCartRequestDto requestDto) {
        CartResponseDto updatedCart = cartService.addProductToCart(customerId, requestDto.getProductId());
        return ResponseEntity.ok(updatedCart);
    }

    /**
     * DELETE /api/cart/{customerId}/items/{productId} : Removes a single item from the cart.
     */
    @DeleteMapping("/{customerId}/items/{productId}")
    public ResponseEntity<CartResponseDto> removeProductFromCart(
            @PathVariable Long customerId,
            @PathVariable Long productId) {
        CartResponseDto updatedCart = cartService.removeProductFromCart(customerId, productId);
        return ResponseEntity.ok(updatedCart);
    }

    /**
     * DELETE /api/cart/{customerId} : Clears all items from the customer's cart.
     */
    @DeleteMapping("/{customerId}")
    public ResponseEntity<CartResponseDto> clearCart(@PathVariable Long customerId) {
        CartResponseDto clearedCart = cartService.clearCart(customerId);
        return ResponseEntity.ok(clearedCart);
    }
}
