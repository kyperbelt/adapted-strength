package com.terabite.payment.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;

@Service
public class WebhookService {
    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    @Value("${ADAPTED_STRENGTH_STRIPE_ENDPOINT}")
    private String endpointSecret;

    public HttpStatus handleWebhookEvent(String payload, Map<String, String> header){
        System.out.println("\nendpoint hit");
        Event event = null;

        try{
            event=ApiResource.GSON.fromJson(payload, Event.class);
        }
        catch(JsonSyntaxException e){
            return HttpStatus.BAD_REQUEST;
        }

        String sigHeader = header.get("Stripe-Signature");
        if (endpointSecret != null && sigHeader != null){
            try{
                event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            }
            catch (SignatureVerificationException e){
                return HttpStatus.BAD_REQUEST;
            }
        }
         
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if(dataObjectDeserializer.getObject().isPresent()){
            stripeObject = dataObjectDeserializer.getObject().get();
        }
        else{
            //deserialization failed, probably due to API version mismatch
            //
        }

        //handle event
        if(event.getType() == "payment_intent.succeeded"){
            PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
            handlePaymentIntentSuccess(paymentIntent);
        }

        else if (event.getType() == "customer.subscription.created"){
            Subscription subscription = (Subscription) stripeObject;
            handleCustomerSubscriptionCreated(subscription);
        }

        else if (event.getType() == "customer.subscription.deleted"){
            Subscription subscription = (Subscription) stripeObject;
            handleCustomerSubscriptionDeleted(subscription);
        }
        else if (event.getType() == "customer.subscription.updated"){
            Subscription subscription = (Subscription) stripeObject;
            handleCustomerSubscriptionUpdated(subscription);
        }

        return HttpStatus.OK;
    }

    public void handlePaymentIntentSuccess(PaymentIntent paymentIntent){
        
    }

    public void handleCustomerSubscriptionCreated(Subscription subscription){

    }

    public void handleCustomerSubscriptionDeleted(Subscription subscription){

    }

    public void handleCustomerSubscriptionUpdated(Subscription subscription){

    }

    
}
