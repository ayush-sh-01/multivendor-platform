package com.multivendor.config;

import com.multivendor.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.List;

/**
 * Main Spring Security configuration class.
 * Configures CORS, role-based route permissions, password hashing, and JWT filter registration.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * BCrypt password encoder bean for hashing passwords securely.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * CORS Configuration allowing requests from browser frontends (e.g. React, Vue, HTML/JS).
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Defines the security rules and access permissions for all HTTP endpoints.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Enable CORS with the bean configuration above
            .cors(Customizer.withDefaults())

            // Disable CSRF since REST APIs use stateless JWT tokens
            .csrf(csrf -> csrf.disable())

            // Make sessions STATELESS because we authenticate each request with a JWT token
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Configure URL authorization rules
            .authorizeHttpRequests(auth -> auth
                // 1. Static Web Frontend & Documentation (No authentication needed)
                .requestMatchers("/", "/index.html", "/app.js", "/favicon.ico", "/assets/**", "/static/**", "/css/**", "/js/**", "/images/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                .requestMatchers("/api/chatbot/**").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow pre-flight CORS checks

                // 2. Vendor Protected Endpoints
                .requestMatchers(HttpMethod.POST, "/api/products/**").hasAnyRole("VENDOR", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasAnyRole("VENDOR", "ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasAnyRole("VENDOR", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/vendors/**").hasAnyRole("VENDOR", "ADMIN")

                // 3. Customer Protected Endpoints (Shopping & Orders)
                .requestMatchers("/api/cart/**").hasAnyRole("CUSTOMER", "ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/orders/**").hasAnyRole("CUSTOMER", "ADMIN")
                .requestMatchers("/api/orders/customer/**").hasAnyRole("CUSTOMER", "ADMIN")

                // 4. Admin Protected Endpoints
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN")

                // 5. All other endpoints require authentication
                .anyRequest().authenticated()
            )

            // Register our JWT authentication filter before the default UsernamePassword filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
