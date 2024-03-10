package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Subscription;
import com.stripe.param.SubscriptionUpdateParams;

@Service
public class PaymentService {
    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    public ResponseEntity<?> cancelSubscriptionById(String subscriptionId) throws StripeException{
        Stripe.apiKey = stripeKey;

        //get the subscription
        Subscription resource = Subscription.retrieve(subscriptionId);


        //set cancel at period end to true
        SubscriptionUpdateParams params = SubscriptionUpdateParams
        .builder()
        .setCancelAtPeriodEnd(true)
        .build();

        //call stripe to updtae subscription
        Subscription updatedSubscription = resource.update(params);

        return new ResponseEntity<>(updatedSubscription, HttpStatus.OK);
    }
}
