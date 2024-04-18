package com.terabite.payment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.terabite.payment.service.PaymentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<?> cancelSubscriptionById(@AuthenticationPrincipal UserDetails userDetails) throws StripeException {
        return paymentService.cancelSubscriptionById(userDetails.getUsername());
    }
    
    @PostMapping("/create_checkout_session")
    public ResponseEntity<?> createCheckoutSession(@AuthenticationPrincipal UserDetails userDetails) throws StripeException{
        if(userDetails!=null){
            return paymentService.createCheckoutSession("price_1Osq2IFNE1ftX3iy9K9vCz6u",userDetails.getUsername() );
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/session_status?session_id={checkoutSessionId}")
    public ResponseEntity<?> retrieveCheckoutSessionStatus(@PathVariable("checkoutSessionId") String checkoutSessionId) throws StripeException {
        return paymentService.retrieveCheckoutSessionStatus(checkoutSessionId);
    }
    
}
