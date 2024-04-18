package com.terabite.payment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.terabite.payment.service.WebhookService;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/v1/webhook")
public class WebhookController {
    private WebhookService webhookService;
    private static final Logger log = LoggerFactory.getLogger(WebhookController.class);

    public WebhookController(WebhookService webhookService) {
        this.webhookService = webhookService;
    }

    @PostMapping("/")
    public HttpStatus handleWebhookEvent(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") Map<String, String> stripeSignature) {

        return webhookService.handleWebhookEvent(payload, stripeSignature);
    }

}
