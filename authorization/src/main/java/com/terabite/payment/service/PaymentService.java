package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.SubscriptionUpdateParams;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService {
    @Value("${ADAPTED_STRENGTH_STRIPE_SECRET_KEY}")
    private String stripeKey;

    public PaymentService(){

    }

    public ResponseEntity<?> cancelSubscriptionById(String subscriptionId) throws StripeException{
        Stripe.apiKey = stripeKey;

        //get the subscription
        Subscription resource = Subscription.retrieve(subscriptionId);


        //set cancel at period end to true
        SubscriptionUpdateParams params = SubscriptionUpdateParams
        .builder()
        .setCancelAtPeriodEnd(true)
        .build();

        //call stripe to update subscription
        Subscription updatedSubscription = resource.update(params);

        return new ResponseEntity<>(updatedSubscription, HttpStatus.OK);
    }

    public ResponseEntity<?> createCheckoutSession(String priceId) throws StripeException{
        Stripe.apiKey = stripeKey;
        String returnUrl = "";

        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                .setPrice(priceId)
                .setQuantity(1L)
                .build()
            )
            .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
            .setReturnUrl(returnUrl + "?session_id={CHECKOUT_SESSION_ID}")
            .build();

        Session session = Session.create(params);
        String clientSecret = session.getPaymentIntentObject().getClientSecret();
        return new ResponseEntity<>(clientSecret, HttpStatus.OK);
        
    }

    public ResponseEntity<?> retrieveCheckoutSessionStatus(String checkoutSessionId) throws StripeException{
        Stripe.apiKey = stripeKey;
        Session session = Session.retrieve(checkoutSessionId);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }
}
