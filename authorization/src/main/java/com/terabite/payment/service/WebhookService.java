package com.terabite.payment.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import com.terabite.payment.repository.CustomerRepository;
import com.terabite.user.model.SubscriptionStatus;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;

@Service
public class WebhookService {
    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    @Value("${ADAPTED_STRENGTH_STRIPE_ENDPOINT}")
    private String endpointSecret;

    @Value("${ADAPTED_STRENGTH_BASE_PRICE_ID}")
    private String baseClientPriceId;

    @Value("${ADAPTED_STRENGTH_GENERAL_PRICE_ID}")
    private String generalClientPriceId;

    @Value("${ADAPTED_STRENGTH_SPECIFIC_PRICE_ID}")
    private String specificClientPriceId;

    private CustomerRepository customerRepository;

    private UserRepository userRepository;

    public WebhookService(CustomerRepository customerRepository, UserRepository userRepository){
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    public HttpStatus handleWebhookEvent(String payload, Map<String, String> header){
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

        if (event.getType() == "customer.subscription.created"){
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


    // handle the event

    // When a subscription is created all we need to do is associate the subscriptionId with the user in our database
    public void handleCustomerSubscriptionCreated(Subscription subscription){
        String customerId = subscription.getCustomer();
        com.terabite.payment.model.Customer customer;
        if(customerId!= null){
            customer = customerRepository.findById(customerId).orElse(null);
            if(customer!= null){
                customer.setSubscriptionId(subscription.getId());
                customerRepository.save(customer);
            }
        }
    }

    // Subscription deleted means the subscription has ended
    public void handleCustomerSubscriptionDeleted(Subscription subscription){
        UserInformation userInformation = getUserBySubscription(subscription);
        if (userInformation != null){
            userInformation.setSubscriptionTier(SubscriptionStatus.NO_SUBSCRIPTION);
            userRepository.save(userInformation);
        }
    }

    public void handleCustomerSubscriptionUpdated(Subscription subscription){
        UserInformation userInformation = getUserBySubscription(subscription);
        
        //Not sure about this. Should only happen if there is no user associated with the subscription
        if(userInformation == null){
            return;
        }

        /* 
            Subscription updates can mean many things, so we have to check the status of the subscription before we change anything.
            First case will be statuses that would result in losing access to content.
        */
        if (subscription.getStatus() == "canceled" 
            || subscription.getStatus() == "paused"                   // paused can only happen when a free trial ends which is not currently a feature but may be later
            || subscription.getStatus() == "incomplete"               // incomplete happens after a subscription object has been created but before it is paid
            || subscription.getStatus() == "incomplete_expired"       // incomplete_expired means that the user never finished the payment
            || subscription.getStatus() == "unpaid"){                 
                userInformation.setSubscriptionTier(SubscriptionStatus.NO_SUBSCRIPTION);
        }


        // This block will assign the new subscriptionStatus of active subs based on their paymentId
        else if (subscription.getStatus() == "active"){
            if(subscription.getItems().getData().get(6).getPrice().getId() == baseClientPriceId){
                userInformation.setSubscriptionTier(SubscriptionStatus.BASE_CLIENT);
            }
            else if(subscription.getItems().getData().get(6).getPrice().getId() == generalClientPriceId){
                userInformation.setSubscriptionTier(SubscriptionStatus.GENERAL_CLIENT);
            }
            else if(subscription.getItems().getData().get(6).getPrice().getId() == specificClientPriceId){
                userInformation.setSubscriptionTier(SubscriptionStatus.SPECIFIC_CLIENT);
            }
        }
    }


    public UserInformation getUserBySubscription(Subscription subscription){
        String customerId = subscription.getCustomer();
        
        if (customerId == null){
            return null;
        }
        com.terabite.payment.model.Customer customer = customerRepository.findById(customerId).orElse(null);

        if (customer!=null){
            UserInformation userInformation = userRepository.findByCustomer(customer).orElse(null);
            return userInformation;
        }
        else{
            return null;
        }
    }

    
}
