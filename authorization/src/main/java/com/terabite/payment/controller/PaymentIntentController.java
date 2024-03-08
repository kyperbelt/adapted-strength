package com.terabite.payment.controller;

import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.terabite.payment.model.OrderInformation;
import com.terabite.payment.model.PaymentIntentId;
import com.terabite.payment.service.PaymentIntentService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/v1/payment_intents")
public class PaymentIntentController {
    private PaymentIntentService paymentIntentService;

    public PaymentIntentController(PaymentIntentService paymentIntentService){
        this.paymentIntentService=paymentIntentService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> postPaymentIntent(@RequestBody OrderInformation orderInformation) throws StripeException{
        return paymentIntentService.createPaymentIntent(orderInformation);
    }

    @GetMapping("/")
    public ResponseEntity<?> getClientSecretByPaymentIntent(@RequestBody PaymentIntentId paymentIntentId) throws StripeException {
        return paymentIntentService.getClientSecretByPaymentIntentId(paymentIntentId);
    }
    

    //TODO get rid of this, testing putposes only
    @GetMapping("/all")
    public ResponseEntity<?> getAllPaymentIntents() throws StripeException{
        return paymentIntentService.getAllPaymentIntents();
    }
    
    
    
}
