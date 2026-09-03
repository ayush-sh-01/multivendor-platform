package com.multivendor.config;

import com.multivendor.entity.Cart;
import com.multivendor.entity.Category;
import com.multivendor.entity.Product;
import com.multivendor.entity.Role;
import com.multivendor.entity.User;
import com.multivendor.entity.Vendor;
import com.multivendor.repository.CartRepository;
import com.multivendor.repository.CategoryRepository;
import com.multivendor.repository.ProductRepository;
import com.multivendor.repository.UserRepository;
import com.multivendor.repository.VendorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Automatically seeds initial luxury categories, vendors, products, and user accounts
 * on application startup if the database is currently empty.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           VendorRepository vendorRepository,
                           CategoryRepository categoryRepository,
                           ProductRepository productRepository,
                           CartRepository cartRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Data already exists, skip seeding
        }

        System.out.println("🌱 Initializing DEZEL Luxury Platform default data...");

        // 1. Create Users
        User adminUser = new User("Admin", "admin@dezel.com", passwordEncoder.encode("admin123"), Role.ADMIN);
        userRepository.save(adminUser);

        User artisanUser = new User("Artisan Maison Seller", "artisan@dezel.com", passwordEncoder.encode("vendor123"), Role.VENDOR);
        userRepository.save(artisanUser);

        User houseUser = new User("House of Dezel Seller", "house@dezel.com", passwordEncoder.encode("vendor123"), Role.VENDOR);
        userRepository.save(houseUser);

        User luxeUser = new User("Luxe Origins Seller", "luxe@dezel.com", passwordEncoder.encode("vendor123"), Role.VENDOR);
        userRepository.save(luxeUser);

        User customerUser = new User("Elena Vance", "customer@dezel.com", passwordEncoder.encode("customer123"), Role.CUSTOMER);
        userRepository.save(customerUser);

        // Create Cart for Customer
        Cart customerCart = new Cart(customerUser);
        cartRepository.save(customerCart);

        // 2. Create Vendors
        Vendor vendorArtisan = new Vendor("Artisan Maison", artisanUser);
        vendorRepository.save(vendorArtisan);

        Vendor vendorHouse = new Vendor("House of Dezel", houseUser);
        vendorRepository.save(vendorHouse);

        Vendor vendorLuxe = new Vendor("Luxe Origins", luxeUser);
        vendorRepository.save(vendorLuxe);

        // 3. Create Categories
        Category catJeans = new Category("Jeans & Denim", "Japanese raw selvedge, 90s vintage loose washes, and wide silhouettes.");
        categoryRepository.save(catJeans);

        Category catJackets = new Category("Jackets & Outerwear", "Heavy tactical parkas, vintage bombers, workwear, and denim jackets.");
        categoryRepository.save(catJackets);

        Category catShirts = new Category("Shirts & Tops", "Old money striped oxfords, boxy button-downs, and vintage graphic tees.");
        categoryRepository.save(catShirts);

        Category catArchival = new Category("Archival Finds", "Curated one-of-one pieces, student designer drops, and rare retro grails.");
        categoryRepository.save(catArchival);

        // 4. Create Products Matching ThriftCampus Luxury Clothing Aesthetic
        Product p1 = new Product(
                "Raw Selvedge Wide Jeans",
                "Wide-leg, heavyweight raw Japanese selvedge denim with crisp contrast white stitching and structured drape. Zero synthetic stretch.",
                95.00,
                25,
                "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
                true,
                vendorArtisan,
                catJeans
        );

        Product p2 = new Product(
                "Vintage Indigo Loose Denim",
                "Classic loose fit vintage washed denim with authentic natural fading and relaxed skate silhouette.",
                85.00,
                30,
                "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80",
                true,
                vendorHouse,
                catJeans
        );

        Product p3 = new Product(
                "Striped Old Money Oxford Shirt",
                "Crisp cotton striped button-down shirt with structured classic collar and tailored cuffs. Timeless archival prep aesthetic.",
                65.00,
                15,
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
                true,
                vendorLuxe,
                catShirts
        );

        Product p4 = new Product(
                "Vintage Sport Activewear Tee",
                "Heavyweight breathable activewear graphic tee with subtle retro typography and reinforced crew neckline.",
                45.00,
                40,
                "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
                true,
                vendorArtisan,
                catShirts
        );

        Product p5 = new Product(
                "Archival Washed Bomber Jacket",
                "Washed utility bomber jacket with heavy-gauge industrial zipper, ribbed trims, and authentic vintage distress.",
                135.00,
                20,
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
                true,
                vendorHouse,
                catJackets
        );

        Product p6 = new Product(
                "Heavy Tactical Utility Parka",
                "Structured oversized utility parka with storm flap, metallic snaps, storm cuffs, and deep cargo bellows pockets.",
                165.00,
                18,
                "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
                true,
                vendorLuxe,
                catJackets
        );

        productRepository.save(p1);
        productRepository.save(p2);
        productRepository.save(p3);
        productRepository.save(p4);
        productRepository.save(p5);
        productRepository.save(p6);

        System.out.println("✅ ThriftCampus Platform seeded successfully with student accounts, vendors, clothing categories, and archival pieces!");
    }

}
