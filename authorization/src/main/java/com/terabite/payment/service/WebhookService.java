package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class WebhookService {
    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    public HttpStatus handleWebhookEvent(String payload){

        return HttpStatus.OK;
    }
}
