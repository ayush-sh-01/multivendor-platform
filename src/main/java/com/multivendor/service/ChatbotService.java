package com.multivendor.service;

import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    public String getResponse(String userMessage) {
        String lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.contains("hello") || lowerMsg.contains("hi") || lowerMsg.contains("hey")) {
            return "Hello! I am the ThriftCampus AI assistant. How can I help you today?";
        } else if (lowerMsg.contains("price") || lowerMsg.contains("cost") || lowerMsg.contains("much")) {
            return "You can check the price of any item on its product detail page. All our products are priced for student budgets!";
        } else if (lowerMsg.contains("shipping") || lowerMsg.contains("delivery") || lowerMsg.contains("track")) {
            return "We offer zero carbon campus hand-offs and standard shipping! Delivery times depend on the curator's location.";
        } else if (lowerMsg.contains("vendor") || lowerMsg.contains("sell") || lowerMsg.contains("curator")) {
            return "To become a curator/vendor and start selling your archive, simply click the 'Upload' button to get started!";
        } else if (lowerMsg.contains("refund") || lowerMsg.contains("return") || lowerMsg.contains("cancel")) {
            return "Returns are accepted within 7 days for peer-verified items if they don't match the description. Check our policy page for details.";
        } else if (lowerMsg.contains("authentic") || lowerMsg.contains("fake") || lowerMsg.contains("legit")) {
            return "All items on ThriftCampus are peer-verified for authenticity before hand-off to ensure you get genuine pieces.";
        } else if (lowerMsg.contains("payment") || lowerMsg.contains("pay") || lowerMsg.contains("card")) {
            return "We accept all major credit cards, UPI, and campus ID points for easy checkout.";
        } else if (lowerMsg.contains("contact") || lowerMsg.contains("support") || lowerMsg.contains("help")) {
            return "You can reach our support team at support@thriftcampus.com or ask me any quick questions right here!";
        }
        
        return "I'm a simple AI chatbot! Try asking me about our curators, shipping, authenticity, or how to sell your clothes.";
    }
}
