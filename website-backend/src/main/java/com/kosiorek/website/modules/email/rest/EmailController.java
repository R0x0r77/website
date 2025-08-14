package com.kosiorek.website.modules.email.rest;

import com.kosiorek.website.modules.email.dto.ContactFormRequest;
import com.kosiorek.website.modules.email.dto.ContactFormResponse;
import com.kosiorek.website.modules.email.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<ContactFormResponse> sendContactForm(@Valid @RequestBody ContactFormRequest request) {
        String subject = "New contact form submission from " + request.getName();
        String text = "Name: " + request.getName() + "\nEmail: " + request.getEmail() + "\n\nMessage:\n" + request.getMessage();

        emailService.sendSimpleMessage(request.getEmail(), subject, text);

        return ResponseEntity.ok(new ContactFormResponse("Message sent successfully!"));
    }
}
