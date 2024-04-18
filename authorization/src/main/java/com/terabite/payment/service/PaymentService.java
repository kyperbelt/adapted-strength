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

@Service
public class PaymentService {
    @Value("${ADAPTED_STRENGTH_STRIPE_SECRET_KEY}")
    private String stripeKey;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

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
        

        // get the subscription
        Subscription resource = Subscription.retrieve(subscriptionId);

        // set cancel at period end to true
        SubscriptionUpdateParams params = SubscriptionUpdateParams
                .builder()
                .setCancelAtPeriodEnd(true)
                .build();

        // call stripe to update subscription
        Subscription updatedSubscription = resource.update(params);

        return new ResponseEntity<>(updatedSubscription, HttpStatus.OK);
    }

    public ResponseEntity<?> createCheckoutSession(String priceId, String email) throws StripeException {
        Stripe.apiKey = stripeKey;

        // find the user based on email so that we can assign customer
        UserInformation userInformation = userRepository.findByEmail(email).orElse(null);
        // add null protection
        if (userInformation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String stripeCustomer = userInformation.getCustomer().getId();

        // need to fill in this return url
        String returnUrl = "http://localhost:3000";

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build())
                .setCustomer(stripeCustomer)
                .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                .setReturnUrl(returnUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .build();

        Session session = Session.create(params);
        String clientSecret = session.getClientSecret();
        return new ResponseEntity<>(Payload.of(clientSecret), HttpStatus.OK);
    }

    public ResponseEntity<?> retrieveCheckoutSessionStatus(String checkoutSessionId) throws StripeException {
        Stripe.apiKey = stripeKey;
        Session session = Session.retrieve(checkoutSessionId);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }
}
