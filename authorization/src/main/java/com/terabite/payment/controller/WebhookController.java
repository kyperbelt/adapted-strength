package com.terabite.payment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.payment.service.WebhookService;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;


@RestController
@RequestMapping("/v1/webhook")
public class WebhookController {
    private WebhookService webhookService;

    public WebhookController(WebhookService webhookService){
        this.webhookService=webhookService;
    }

    @PostMapping("/")
    public HttpStatus handleWebhookEvent(@RequestBody String payload, @RequestHeader Map<String, String> header) {
        return webhookService.handleWebhookEvent(payload, header);
    }
    
    
}
