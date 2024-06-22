package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Qualifier;
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
import com.terabite.GlobalConfiguration;
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
    private final CustomerService customerService;

    @Value("${ADAPTED_STRENGTH_STRIPE_SECRET_KEY}")
    private String stripeKey;

    @Value("${ADAPTED_STRENGTH_BASE_PRICE_ID}")
    private String baseClientPriceId;

    @Value("${ADAPTED_STRENGTH_SPECIFIC_PRICE_ID}")
    private String specificClientPriceId;

    private final String webUrl;
    private final String domainPort;
    private final String webProtocol;

    public PaymentService(final CustomerService customerService, UserRepository userRepository,
            CustomerRepository customerRepository,
            @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_URL) String webUrl,
            @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_PORT) String domainPort,
            @Qualifier(GlobalConfiguration.BEAN_NAME_DOMAIN_PROTOCOL) String webProtocol) {
        this.webUrl = webUrl;
        this.domainPort = domainPort;
        this.webProtocol = webProtocol;
        this.customerService = customerService;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    public ResponseEntity<?> cancelSubscriptionById(String userEmail) throws StripeException {

        Stripe.apiKey = stripeKey;

        UserInformation userInformation = userRepository.findByEmail(userEmail).orElse(null);
        if (userInformation == null) {
            return new ResponseEntity<>(Payload.of("User not found"), HttpStatus.BAD_REQUEST);
        }
        Customer customer = customerRepository.findByUserInformation(userInformation).orElse(null);
        if (customer == null) {
            return new ResponseEntity<>(Payload.of("Customer not found"), HttpStatus.BAD_REQUEST);
        }
        String subscriptionId = customer.getSubscriptionId();
        if (subscriptionId == null) {
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
        resource.update(params);

        return new ResponseEntity<>(Payload.of("Subscription Cancelled"), HttpStatus.OK);
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
        if (subLevel.equals("base")) {
            priceId = baseClientPriceId;
        } else if (subLevel.equals("specific")) {
            priceId = specificClientPriceId;
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String returnUrl = String.format("%s://%s%s", webProtocol, webUrl, (domainPort == null || domainPort.isBlank()) ? "" : ":" + domainPort);

        LocalDate today = LocalDate.now();
        LocalDate firstDayOfNextMonth = today.withDayOfMonth(1).plusMonths(1);
        long firstDayTimestamp = firstDayOfNextMonth.atStartOfDay(ZoneOffset.UTC).toEpochSecond();

        SessionCreateParams params = getSessionParams(userInformation, priceId, stripeCustomer, returnUrl,
                firstDayTimestamp);
        Session session = null;
        try {
            session = Session.create(params);
        } catch (StripeException e) {
            final String nocustomerString = "No such customer:";
            if (e.getMessage().contains(nocustomerString)) {
                Customer customer;
                try {
                    customer = customerService.createNewCustomer(userInformation);
                    userInformation.setCustomer(customer);
                    userRepository.save(userInformation);
                    params = getSessionParams(userInformation, priceId, customer.getId(), returnUrl, firstDayTimestamp);
                    session = Session.create(params);
                } catch (StripeException e2) {
                    return new ResponseEntity<>(Payload.of("Error creating customer"), HttpStatus.BAD_REQUEST);
                }
            }

        }

        if (session == null) {
            return new ResponseEntity<>(Payload.of("Error creating session"), HttpStatus.BAD_REQUEST);
        }

        String clientSecret = session.getClientSecret();
        return new ResponseEntity<>(Payload.of(clientSecret), HttpStatus.OK);
    }

    private SessionCreateParams getSessionParams(UserInformation userInformation, String priceId,
            final String stripeCustomer, final String returnUrl, final long firstDayTimestamp) {
        return SessionCreateParams.builder()
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
        if (customer == null) {
            return new ResponseEntity<>("Customer not found", HttpStatus.BAD_REQUEST);
        }

        // get the subscriptionId
        String subscriptionId = customer.getSubscriptionId();
        if (subscriptionId == null) {
            return new ResponseEntity<>("Customer is not subscribed", HttpStatus.BAD_REQUEST);
        }

        Subscription subscription = Subscription.retrieve(subscriptionId);

        String priceId = "";
        if (subLevel.equals("base")) {
            priceId = baseClientPriceId;
        } else if (subLevel.equals("specific")) {
            priceId = specificClientPriceId;
        } else {
            return new ResponseEntity<>("Invalid Subscription Level", HttpStatus.BAD_REQUEST);
        }

        String itemId = subscription.getItems().getData().get(0).getId();

        SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
                .addItem(
                        SubscriptionUpdateParams.Item.builder()
                                .setId(itemId)
                                .setPrice(priceId)
                                .build())
                .setCancelAtPeriodEnd(false)
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
        if (customer == null) {
            return new ResponseEntity<>("Customer not found", HttpStatus.BAD_REQUEST);
        }

        // get the subscriptionId
        String subscriptionId = customer.getSubscriptionId();
        if (subscriptionId == null) {
            return new ResponseEntity<>("Customer is not subscribed", HttpStatus.BAD_REQUEST);
        }

        Subscription subscription = Subscription.retrieve(subscriptionId);
        if (subscription.getStatus().equals("active")) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

}
