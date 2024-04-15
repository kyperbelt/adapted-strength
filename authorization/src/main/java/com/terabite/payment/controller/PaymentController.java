package com.terabite.payment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.terabite.payment.service.PaymentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/v1/payments")
public class PaymentController {
    private PaymentService paymentService;

    public PaymentController(PaymentService paymentService){
        this.paymentService = paymentService;
    }


    @PostMapping("/cancel_subscription")
    public ResponseEntity<?> cancelSubscriptionById(@RequestBody String subscriptionId) throws StripeException {
        return paymentService.cancelSubscriptionById(subscriptionId);
    }
    
    @PostMapping("/create_checkout_session")
    public ResponseEntity<?> createCheckoutSession(String priceId) throws StripeException{
        return paymentService.createCheckoutSession(priceId);
    }

    @GetMapping("/session_status?session_id={checkoutSessionId}")
    public ResponseEntity<?> retrieveCheckoutSessionStatus(@PathVariable("checkoutSessionId") String checkoutSessionId) throws StripeException {
        return paymentService.retrieveCheckoutSessionStatus(checkoutSessionId);
    }
    
}
