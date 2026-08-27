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
        Category catHaute = new Category("Haute Parfumerie", "Finest haute perfumery creations crafted with rare essences.");
        categoryRepository.save(catHaute);

        Category catArtisan = new Category("Artisan Scents", "Hand-blended perfumes from master independent noses.");
        categoryRepository.save(catArtisan);

        Category catPrivate = new Category("Private Reserve", "Exclusive, numbered editions for collectors.");
        categoryRepository.save(catPrivate);

        Category catLimited = new Category("Limited Editions", "Seasonal rare harvests and bespoke single-batch extraits.");
        categoryRepository.save(catLimited);

        // 4. Create Products Matching Google Stitch UI
        Product p1 = new Product(
                "L'Or Éblouissant",
                "A captivating symphony of golden amber, warm vanilla, and velvet saffron.",
                350.00,
                25,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCWv4QgXZm4vD3awPH0mrUNbMwUwaiRpFAldrL4GtDVmfPchKVyxs5gRlv1ioD-27sIHxrdj59Sh4X237LL-OG1_wMtB2mzEb55Xdir__xUQHC6SjR1p6Z7pWDIDjNQxs5-QLpGChqhGWhLSbfmbplvqtJ-IFCHTAIbSH7Qo60WTwZOTP1rK2NLY6cTvT_BkQztJh_b3iIrP78r2GMNmNZTyMvjr44S0XaR_Y4rOX96o16IAOFbZdm7AMXJ9samEUSCzQ",
                true,
                vendorArtisan,
                catHaute
        );

        Product p2 = new Product(
                "Noir Absolu",
                "Deep smoky incense intertwining with rich dark leather and black pepper.",
                280.00,
                30,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCHsesv8nAphX_Tr9sAFaQ8xU-5T1shJgyJvxV2z_BFNjH1EMaY5xsL22qC5XhjhnCRaLZcP_S3HJY-5xuxSqdBigUjK_zpqVyTEcwyQEcBYuu67d4tJk_5n3w6njNFOk-nUBNjDaRe9E8pmjkEHGi29T2cZ-6OyaBxIvBks52eTatSRjEamH4WeAS22-FwZy4QAAkoK6eHA87lKNy9ueMJtBIUM6jLqqDoKLmRKlhFQuGjsqYEo5p_vcrnu-fBosPe2g",
                true,
                vendorHouse,
                catPrivate
        );

        Product p3 = new Product(
                "Oud Précieux",
                "Rare aged Royal Cambodian Agarwood layered over royal damask rose.",
                420.00,
                15,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCb97UUgCXnHLT7F88MU95bBy6SpCvCmwND2vGByJUSYuZ47AwYfox0uL4qsbK22grkvOqNxF7tyZDXrQ6owiQS8iCsveUuspdNK4mCenPWTJvLdTkk9wkx4-VdsRSloMzmQg152imf4FAc66BTVjKtkTjh101xYHe3JYapsNw3eXRCUmhDBBRnCFCmujmXdjZxF91N8WnVSlfXaTcVEGMKkUXCI1AUPcAhTC0ZWzaIITh-XgNFmlcbKnXF0f4smhwv-Q",
                true,
                vendorLuxe,
                catLimited
        );

        Product p4 = new Product(
                "Ambre Nuit",
                "Nocturnal allure of spicy coriander, patchouli, and incandescent amber crystals.",
                310.00,
                40,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB9LpJThFOtYRlJMS6wDU2Ep9e4SBVdt64d8j0wuSUF5iK6AjpgO9abu_pFfzUdV9IFeqwNCKvJRNHsy0TgBT07om7VfO1aA0hEHUiGJaH79QNGgFaOpJIqhDszco4kK5WQBfSpuw3rr4qy7VlXwk0omMtyzm9aHF2VpFonN7iDUzsdK2YTJbjwZelpt8cZHUV86wPh2Y2OLRk_LDFt6iSxdqqDJwt3esH4-oS-kSUh7geRHwjfS_7A",
                true,
                vendorArtisan,
                catArtisan
        );

        Product p5 = new Product(
                "Rose Éternelle",
                "Morning dewy May roses infused with white cedarwood and crystalline musk.",
                295.00,
                20,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ctoofypZpqMsJW6R2cqCXsVXE41kdqxsrcxShUCVfajaV-mbrBRoDUTXVl4zotVIwf8PKkVoBSefeA_nbBl7F6fzwgOF7br9PVsFRaLbdsaiULLYI1xvM5VXhrt8ZbhasozJuSDDZw65niP75f-oJnRQUd1ltrZjYzwQ45JOlzQWGk8H7Wty0r6sCXcdiK9JID9kSYfGajKZrvHdjirxzOj94rHGwRfth4ub2d_Nhxx2o93XEVBUUBQOA5zEWxm4ww",
                true,
                vendorHouse,
                catHaute
        );

        Product p6 = new Product(
                "Bleu Mystique",
                "Oceanic freshness fused with aristocratic bergamot, iris, and mineral vetiver.",
                340.00,
                18,
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC05NkCuAwYUEXuxqYBtvNAf04dcg7CS7FfUjrwy_oTuim1uDv9wQGOHnmJGXtccAKDtXfLuKatxiBuGyn_lnkIYKXY2OiSYI_w030krC_Ec9fXMNZHMoFybiHidwgfT4qgoNJ9PKEpgPPlMqbBbuB6CjVhIlc_2PR-xSZT9OG7WKi54fRiRMK0fXwMkC1eQ5J174z3lKkRz7IoqDb0TcKxOqxmFrfC1MuMi9RCZ4jl7MpEOx4Zf98U",
                true,
                vendorLuxe,
                catPrivate
        );

        productRepository.save(p1);
        productRepository.save(p2);
        productRepository.save(p3);
        productRepository.save(p4);
        productRepository.save(p5);
        productRepository.save(p6);

        System.out.println("✅ DEZEL Platform seeded successfully with 5 accounts, 3 vendors, 4 categories, and 6 luxury products!");
    }
}
