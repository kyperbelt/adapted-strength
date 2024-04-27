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
import com.terabite.common.dto.Payload;
import com.terabite.payment.model.Customer;
import com.terabite.payment.repository.CustomerRepository;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;
import java.time.LocalDate;
import java.time.ZoneOffset;

@Service
public class PaymentService {
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    @Value("${ADAPTED_STRENGTH_STRIPE_SECRET_KEY}")
    private String stripeKey;

    @Value("${ADAPTED_STRENGTH_BASE_PRICE_ID}")
    private String baseClientPriceId;

    @Value("${ADAPTED_STRENGTH_SPECIFIC_PRICE_ID}")
    private String specificClientPriceId;

    public PaymentService(UserRepository userRepository, CustomerRepository customerRepository) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    public ResponseEntity<?> cancelSubscriptionById(String userEmail) throws StripeException {
        
        Stripe.apiKey = stripeKey;

        UserInformation userInformation = userRepository.findByEmail(userEmail).orElse(null);
        if(userInformation == null){
            return new ResponseEntity<>(Payload.of("User not found"), HttpStatus.BAD_REQUEST);
        }
        Customer customer = customerRepository.findByUserInformation(userInformation).orElse(null);
        if(customer == null){
            return new ResponseEntity<>(Payload.of("Customer not found"), HttpStatus.BAD_REQUEST);
        }
        String subscriptionId = customer.getSubscriptionId();
        if(subscriptionId == null){
            return new ResponseEntity<>(Payload.of("Customer does not have a subscription"), HttpStatus.BAD_REQUEST);
        }
        
        System.out.println(subscriptionId);
        // get the subscription
        Subscription resource = Subscription.retrieve(subscriptionId);

        // set cancel at period end to true
        SubscriptionUpdateParams params = SubscriptionUpdateParams
                .builder()
                .setCancelAtPeriodEnd(true)
                .build();

        // call stripe to update subscription
        resource.update(params);

        return new ResponseEntity<>(HttpStatus.OK);
    }



    public ResponseEntity<?> createCheckoutSession(String email, String subLevel) throws StripeException {
        Stripe.apiKey = stripeKey;

        // find the user based on email so that we can assign customer
        UserInformation userInformation = userRepository.findByEmail(email).orElse(null);
        // add null protection
        if (userInformation == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        String stripeCustomer = userInformation.getCustomer().getId();

        String priceId = "";
        if(subLevel.equals("base")){
            priceId = baseClientPriceId;
        }
        else if(subLevel.equals("specific")){
            priceId = specificClientPriceId;
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // TODO: update this retun url to live website on deployment
        String returnUrl = "http://localhost:3000";

        LocalDate today = LocalDate.now();
        LocalDate firstDayOfNextMonth = today.withDayOfMonth(1).plusMonths(1);
        long firstDayTimestamp = firstDayOfNextMonth.atStartOfDay(ZoneOffset.UTC).toEpochSecond();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build())
                .setCustomer(stripeCustomer)
                .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                .setReturnUrl(returnUrl)
                .setSubscriptionData(SessionCreateParams.SubscriptionData.builder()
                    .setBillingCycleAnchor(firstDayTimestamp)
                    .build())
                .build();

        Session session = Session.create(params);
        String clientSecret = session.getClientSecret();
        return new ResponseEntity<>(Payload.of(clientSecret), HttpStatus.OK);
    }


    
    public ResponseEntity<?> changeSubscriptionLevel(String email, String subLevel) throws StripeException {
        Stripe.apiKey = stripeKey;

        // find the user based on email so that we can assign customer
        UserInformation userInformation = userRepository.findByEmail(email).orElse(null);
        // add null protection
        if (userInformation == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        // find TeraBITE customer object so that we can get the user's subscriptionId
        Customer customer = customerRepository.findByUserInformation(userInformation).orElse(null);
        if (customer == null){
            return new ResponseEntity<>("Customer not found", HttpStatus.BAD_REQUEST);
        }

        // get the subscriptionId
        String subscriptionId = customer.getSubscriptionId();
        if(subscriptionId == null){
            return new ResponseEntity<>("Customer is not subscribed", HttpStatus.BAD_REQUEST);
        }

        Subscription subscription = Subscription.retrieve(subscriptionId);

        String priceId = "";
        if(subLevel.equals("base")){
            priceId = baseClientPriceId;
        }
        else if(subLevel.equals("specific")){
            priceId = specificClientPriceId;
        }
        else{
            return new ResponseEntity<>("Invalid Subscription Level", HttpStatus.BAD_REQUEST);
        }

        String itemId = subscription.getItems().getData().get(0).getId();

        SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
            .addItem(
                SubscriptionUpdateParams.Item.builder()
                .setId(itemId)
                .setPrice(priceId)
                .build()
            )
            .build();
        subscription.update(params);
        return new ResponseEntity<>(Payload.of("Subscription updated"), HttpStatus.OK);
    }

    public ResponseEntity<?> getActiveSubscriptionStatus(String email) throws StripeException {
        Stripe.apiKey = stripeKey;

        // find the user based on email so that we can assign customer
        UserInformation userInformation = userRepository.findByEmail(email).orElse(null);
        // add null protection
        if (userInformation == null) {
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }

        // find TeraBITE customer object so that we can get the user's subscriptionId
        Customer customer = customerRepository.findByUserInformation(userInformation).orElse(null);
        if (customer == null){
            return new ResponseEntity<>("Customer not found", HttpStatus.BAD_REQUEST);
        }

        // get the subscriptionId
        String subscriptionId = customer.getSubscriptionId();
        if(subscriptionId == null){
            return new ResponseEntity<>("Customer is not subscribed", HttpStatus.BAD_REQUEST);
        }

        Subscription subscription = Subscription.retrieve(subscriptionId);
        if(subscription.getStatus().equals("active")){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    
}
