package com.terabite.payment.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentIntentCollection;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentListParams;
import com.terabite.payment.model.OrderInformation;
import com.terabite.payment.model.PaymentIntentId;



@Service
public class PaymentIntentService {
    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    public PaymentIntentService(){

    }

    public ResponseEntity<?> createPaymentIntent(OrderInformation orderInformation)throws StripeException{
        Stripe.apiKey = stripeKey;

        PaymentIntentCreateParams params = 
        PaymentIntentCreateParams.builder()
        .setAmount(orderInformation.getAmmount())
        .setCurrency("usd")
        .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return new ResponseEntity<>(paymentIntent.toJson(), HttpStatus.OK);
    }

    public ResponseEntity<?> getAllPaymentIntents() throws StripeException{
        Stripe.apiKey = stripeKey;

        PaymentIntentListParams params = PaymentIntentListParams.builder().build();
        PaymentIntentCollection paymentIntents = PaymentIntent.list(params);
        return new ResponseEntity<>(paymentIntents.toJson(), HttpStatus.OK);
    }

    public ResponseEntity<?> getClientSecretByPaymentIntentId(PaymentIntentId paymentIntentId)throws StripeException{
        Stripe.apiKey = stripeKey;
        
        PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId.getId());

        Map<String, String> map = new HashMap();
        map.put("client_secret", intent.getClientSecret());

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    
}
