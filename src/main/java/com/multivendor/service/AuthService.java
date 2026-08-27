package com.multivendor.service;

import com.multivendor.dto.AuthRequestDto;
import com.multivendor.dto.AuthResponseDto;
import com.multivendor.dto.UserRequestDto;
import com.multivendor.entity.Cart;
import com.multivendor.entity.Role;
import com.multivendor.entity.User;
import com.multivendor.repository.CartRepository;
import com.multivendor.repository.UserRepository;
import com.multivendor.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, CartRepository cartRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Registers a new user, hashes their password, sets up an empty cart if customer,
     * and returns a newly generated JWT token.
     */
    public AuthResponseDto register(UserRequestDto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("A user with email '" + requestDto.getEmail() + "' already exists.");
        }

        User user = new User();
        user.setName(requestDto.getName());
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword())); // Hash password securely
        user.setRole(requestDto.getRole());

        User savedUser = userRepository.save(user);

        // If the registered user is a CUSTOMER, automatically initialize their shopping cart
        if (savedUser.getRole() == Role.CUSTOMER) {
            Cart cart = new Cart(savedUser);
            cartRepository.save(cart);
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId(), savedUser.getRole().name());

        return new AuthResponseDto(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    /**
     * Authenticates user by matching email and verifying BCrypt password hash.
     * Generates and returns a JWT token on success.
     */
    public AuthResponseDto login(AuthRequestDto requestDto) {
        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        // Verify password against BCrypt hash
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getRole().name());

        return new AuthResponseDto(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
