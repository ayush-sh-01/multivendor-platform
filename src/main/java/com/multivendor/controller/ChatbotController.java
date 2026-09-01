package com.multivendor.controller;

import com.multivendor.dto.ChatRequest;
import com.multivendor.dto.ChatResponse;
import com.multivendor.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*") // Allows the frontend to make requests
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping("/ask")
    public ResponseEntity<ChatResponse> askQuestion(@RequestBody ChatRequest request) {
        String answer = chatbotService.getResponse(request.getMessage());
        return ResponseEntity.ok(new ChatResponse(answer));
    }
}
