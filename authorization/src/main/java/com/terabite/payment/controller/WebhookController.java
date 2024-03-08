package com.terabite.payment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.payment.service.WebhookService;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/v1/webhook")
public class WebhookController {
    private WebhookService webhookService;

    public WebhookController(WebhookService webhookService){
        this.webhookService=webhookService;
    }

    @PostMapping("/")
    public HttpStatus handleWebhookEvent(@RequestBody String payload) {
        
        return webhookService.handleWebhookEvent(payload);
    }
    
    
}
