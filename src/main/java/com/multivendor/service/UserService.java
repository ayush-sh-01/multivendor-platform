package com.multivendor.service;

import com.multivendor.dto.UserRequestDto;
import com.multivendor.dto.UserResponseDto;
import com.multivendor.entity.User;
import com.multivendor.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

/**
 * @Service: Marks this class as a Spring Service component containing business logic.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection: Spring automatically passes UserRepository and PasswordEncoder beans
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Creates a new user after verifying that the email is not already taken,
     * hashing the password with BCrypt.
     */
    public UserResponseDto createUser(UserRequestDto requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("A user with email '" + requestDto.getEmail() + "' already exists.");
        }

        User user = new User();
        user.setName(requestDto.getName());
        user.setEmail(requestDto.getEmail());
        // Hash password securely with BCrypt before persisting to MySQL
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setRole(requestDto.getRole());

        User savedUser = userRepository.save(user);
        return mapToResponseDto(savedUser);
    }

    /**
     * Retrieves a user by their ID.
     */
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return mapToResponseDto(user);
    }

    /**
     * Retrieves all registered users.
     */
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponseDto> responseList = new ArrayList<>();
        for (User user : users) {
            responseList.add(mapToResponseDto(user));
        }
        return responseList;
    }

    /**
     * Updates an existing user's details.
     */
    public UserResponseDto updateUser(Long id, UserRequestDto requestDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // If email is changed, ensure the new email is not already in use by someone else
        if (!user.getEmail().equals(requestDto.getEmail()) && userRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("Email '" + requestDto.getEmail() + "' is already taken.");
        }

        user.setName(requestDto.getName());
        user.setEmail(requestDto.getEmail());
        if (requestDto.getPassword() != null && !requestDto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        }
        user.setRole(requestDto.getRole());

        User updatedUser = userRepository.save(user);
        return mapToResponseDto(updatedUser);
    }

    /**
     * Deletes a user by ID.
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    // --- Private Helper Method for Manual Mapping ---

    private UserResponseDto mapToResponseDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
