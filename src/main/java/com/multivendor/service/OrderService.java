package com.multivendor.service;

import com.multivendor.dto.OrderItemResponseDto;
import com.multivendor.dto.OrderResponseDto;
import com.multivendor.entity.Cart;
import com.multivendor.entity.Order;
import com.multivendor.entity.OrderItem;
import com.multivendor.entity.OrderStatus;
import com.multivendor.entity.Product;
import com.multivendor.entity.User;
import com.multivendor.repository.CartRepository;
import com.multivendor.repository.OrderRepository;
import com.multivendor.repository.ProductRepository;
import com.multivendor.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    /**
     * @Transactional: Ensures the entire order checkout happens as a single atomic transaction.
     * If stock reduction, order creation, or cart clearing fails at any point,
     * the database rolls back all changes automatically to avoid inconsistent states.
     */
    @Transactional
    public OrderResponseDto placeOrderFromCart(Long customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));

        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("No cart found for customer id: " + customerId));

        if (cart.getProducts().isEmpty()) {
            throw new RuntimeException("Cannot place order: Cart is empty.");
        }

        // Count quantity of each product in the cart
        Map<Long, Integer> productQuantities = new HashMap<>();
        Map<Long, Product> productMap = new HashMap<>();
        for (Product product : cart.getProducts()) {
            productQuantities.put(product.getId(), productQuantities.getOrDefault(product.getId(), 0) + 1);
            productMap.put(product.getId(), product);
        }

        // Create new Order entity
        Order order = new Order();
        order.setCustomer(customer);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        double totalOrderAmount = 0.0;
        List<OrderItem> orderItems = new ArrayList<>();

        // Validate stock, reduce inventory, and create order items
        for (Map.Entry<Long, Integer> entry : productQuantities.entrySet()) {
            Long productId = entry.getKey();
            int requestedQuantity = entry.getValue();
            Product product = productMap.get(productId);

            if (!product.isActive()) {
                throw new RuntimeException("Product '" + product.getName() + "' is no longer available.");
            }

            if (product.getStock() < requestedQuantity) {
                throw new RuntimeException("Insufficient stock for product '" + product.getName() + "'. Available: " + product.getStock() + ", in cart: " + requestedQuantity);
            }

            // Deduct inventory
            product.setStock(product.getStock() - requestedQuantity);
            productRepository.save(product);

            // Create OrderItem line snapshotting current price
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(requestedQuantity);
            item.setPriceAtPurchase(product.getPrice());

            orderItems.add(item);
            totalOrderAmount += (product.getPrice() * requestedQuantity);
        }

        order.setTotalAmount(totalOrderAmount);
        order.setOrderItems(orderItems);

        // Save order (Cascade.ALL automatically saves the order items too)
        Order savedOrder = orderRepository.save(order);

        // Clear customer cart after successful order placement
        cart.getProducts().clear();
        cartRepository.save(cart);

        return mapToResponseDto(savedOrder);
    }

    /**
     * Retrieves an order by its ID.
     */
    public OrderResponseDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        return mapToResponseDto(order);
    }

    /**
     * Retrieves all orders for a specific customer.
     */
    public List<OrderResponseDto> getOrdersByCustomer(Long customerId) {
        if (!userRepository.existsById(customerId)) {
            throw new RuntimeException("Customer not found with id: " + customerId);
        }
        List<Order> orders = orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
        List<OrderResponseDto> responseList = new ArrayList<>();
        for (Order order : orders) {
            responseList.add(mapToResponseDto(order));
        }
        return responseList;
    }

    /**
     * Updates order status (e.g. from PENDING to CONFIRMED, SHIPPED, DELIVERED, CANCELLED).
     */
    public OrderResponseDto updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);
        return mapToResponseDto(updatedOrder);
    }

    // --- Private Helper Methods for Manual Mapping ---

    private OrderResponseDto mapToResponseDto(Order order) {
        List<OrderItemResponseDto> itemDtos = new ArrayList<>();
        for (OrderItem item : order.getOrderItems()) {
            double subTotal = item.getPriceAtPurchase() * item.getQuantity();
            itemDtos.add(new OrderItemResponseDto(
                    item.getId(),
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getQuantity(),
                    item.getPriceAtPurchase(),
                    subTotal
            ));
        }

        return new OrderResponseDto(
                order.getId(),
                order.getCustomer().getId(),
                order.getCustomer().getName(),
                order.getStatus(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                itemDtos
        );
    }
}
