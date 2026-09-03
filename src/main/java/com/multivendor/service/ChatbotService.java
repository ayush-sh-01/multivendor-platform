package com.multivendor.service;

import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    public String getResponse(String userMessage) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return "Greetings! How may I assist you with your campus thrift & luxury archive inquiries today?";
        }

        String msg = userMessage.toLowerCase().trim();
        
        // 1. Greetings & Identity
        if (msg.contains("hello") || msg.contains("hi") || msg.contains("hey") || msg.contains("who are you") || msg.contains("what are you")) {
            return "👋 Welcome to ThriftCampus! I am your AI Concierge & Style Assistant. I can help you find curated archive pieces, coordinate zero-carbon campus hand-offs, assist with selling, and answer any questions about our peer-verified marketplace.";
        }
        
        // 2. Buying, Categories & Archive Browsing
        if (msg.contains("buy") || msg.contains("shop") || msg.contains("browse") || msg.contains("catalog") || msg.contains("collection") || msg.contains("product")) {
            return "🛍️ **Exploring Our Archive:**\nYou can browse verified student listings by category (Outerwear, Vintage Tees, Knitwear, Designer, Footwear, Accessories) using the top navigation filters or the search bar! Tap any piece for high-resolution images, measurements, and curator details.";
        }

        // 3. Pricing, Discounts & Student Deals
        if (msg.contains("price") || msg.contains("cost") || msg.contains("much") || msg.contains("discount") || msg.contains("cheap") || msg.contains("deal")) {
            return "🏷️ **Student-Friendly Pricing:**\nAll pieces on ThriftCampus are priced directly by verified student curators at 50-80% off retail value! Plus, with our direct campus hand-offs, you pay **0% buyer fees and zero delivery charges**.";
        }

        // 4. Hand-off, Shipping & Campus Delivery
        if (msg.contains("shipping") || msg.contains("delivery") || msg.contains("handoff") || msg.contains("hand-off") || msg.contains("meet") || msg.contains("pickup") || msg.contains("location")) {
            return "📍 **Campus Hand-Offs (Zero-Carbon):**\nWhen you checkout, select your preferred campus rendezvous point (e.g., Student Union, Library Quad, Central Plaza, North Lawn). You and the seller will receive a secure QR code / meeting confirmation to exchange the item safely!";
        }

        // 5. Selling & Becoming a Curator / Vendor
        if (msg.contains("vendor") || msg.contains("sell") || msg.contains("curator") || msg.contains("upload") || msg.contains("list an item") || msg.contains("listing")) {
            return "✨ **Sell Your Wardrobe Pieces:**\n1. Sign up / log in with a **VENDOR** account.\n2. Click the **'Upload Product'** button in the header.\n3. Add photos, price, sizing, condition rating, and description.\n4. Your piece goes live instantly to thousands of campus students with **zero commission**!";
        }

        // 6. Authenticity & Condition Verification
        if (msg.contains("authentic") || msg.contains("fake") || msg.contains("legit") || msg.contains("condition") || msg.contains("quality") || msg.contains("grade")) {
            return "🛡️ **100% Peer-Verified & Condition Graded:**\nEvery listing undergoes peer quality checks. Curators specify condition grades (Mint / Like New / Gently Used / Vintage Archive). You can inspect the piece in person during the campus hand-off before releasing payment!";
        }

        // 7. Sizing & Measurements
        if (msg.contains("size") || msg.contains("fit") || msg.contains("measurement") || msg.contains("oversized") || msg.contains("true to size")) {
            return "📏 **Sizing & Fit Advice:**\nEach product card displays the tagged size and fit notes. For vintage items that may fit differently than modern tags, we recommend checking the item description or messaging the curator for pit-to-pit measurements!";
        }

        // 8. Refunds, Cancellations & Protection
        if (msg.contains("refund") || msg.contains("return") || msg.contains("cancel") || msg.contains("dispute") || msg.contains("guarantee")) {
            return "🔄 **Buyer & Seller Protection:**\nIf an item does not match its listing description or condition rating during hand-off, you can reject the order on the spot for an instant refund. We also provide a 7-day dispute window.";
        }

        // 9. Payment Methods & Security
        if (msg.contains("payment") || msg.contains("pay") || msg.contains("card") || msg.contains("upi") || msg.contains("wallet") || msg.contains("cash")) {
            return "💳 **Secure Payment Methods:**\nWe support UPI, Debit/Credit Cards, Net Banking, and Campus ID Pay. Funds are securely held until hand-off verification is complete.";
        }

        // 10. Sustainability & Eco-Impact
        if (msg.contains("sustainab") || msg.contains("eco") || msg.contains("carbon") || msg.contains("environment") || msg.contains("planet") || msg.contains("thrift")) {
            return "🌱 **Our Mission & Eco-Impact:**\nEvery second-hand clothing purchase on ThriftCampus saves an average of **2.5 kg of CO₂ and 700 liters of water** compared to fast fashion. Together, our student network is creating a circular fashion movement!";
        }

        // 11. Support & Contact
        if (msg.contains("contact") || msg.contains("support") || msg.contains("help") || msg.contains("email") || msg.contains("phone") || msg.contains("human")) {
            return "📬 **Customer Support:**\nNeed human assistance? Email us anytime at **support@thriftcampus.com** or visit the Student Help Desk at the Union Commons. We're always here to assist!";
        }

        // Default Fallback
        return "✨ I am here to help! Ask me anything about:\n• 🏷️ Current collections & student deals\n• 📦 Campus hand-off locations & safety\n• 🌟 How to list & sell your vintage clothes\n• 🛡️ Authenticity, sizing, & return policies";
    }
}

