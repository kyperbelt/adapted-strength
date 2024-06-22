package com.terabite.payment.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.google.gson.JsonSyntaxException;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import com.terabite.authorization.model.Login;
import com.terabite.authorization.repository.LoginRepository;
import com.terabite.payment.repository.CustomerRepository;
import com.terabite.user.UserApi;
import com.terabite.common.SubscriptionStatus;
// FIXME:  the only user(pacakge) dependency should be UserApi
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;

@Service
public class WebhookService {
    @Value("${ADAPTED_STRENGTH_STRIPE_SECRET_KEY}")
    private String stripeKey;

    @Value("${ADAPTED_STRENGTH_STRIPE_ENDPOINT_SECRET}")
    private String endpointSecret;

    @Value("${ADAPTED_STRENGTH_BASE_PRICE_ID}")
    private String baseClientPriceId;

    @Value("${ADAPTED_STRENGTH_SPECIFIC_PRICE_ID}")
    private String specificClientPriceId;

    private final CustomerRepository customerRepository;

    private final UserRepository userRepository;

    private final LoginRepository loginRepository;

    private final UserApi userApi;

    public WebhookService(CustomerRepository customerRepository, UserRepository userRepository,
            LoginRepository loginRepository, UserApi userApi) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
        this.loginRepository = loginRepository;
        this.userApi = userApi;
    }

    public HttpStatus handleWebhookEvent(String payload, Map<String, String> header) {
        Event event = null;

        try {
            event = ApiResource.GSON.fromJson(payload, Event.class);
        } catch (JsonSyntaxException e) {
            return HttpStatus.BAD_REQUEST;
        }

        String sigHeader = header.get("Stripe-Signature");
        if (endpointSecret != null && sigHeader != null) {
            try {
                event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            } catch (SignatureVerificationException e) {
                return HttpStatus.BAD_REQUEST;
            }
        }

        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            // deserialization failed, probably due to API version mismatch
            //
        }

        final Subscription subscription = (Subscription) stripeObject;
        if (event.getType().equals("customer.subscription.created")) {
            handleCustomerSubscriptionCreated(subscription);
        }

        else if (event.getType().equals("customer.subscription.deleted")) {
            handleCustomerSubscriptionDeleted(subscription);
        }

        else if (event.getType().equals("customer.subscription.updated")) {
            handleCustomerSubscriptionUpdated(subscription);
        }

        return HttpStatus.OK;
    }

    // handle the event

    // When a subscription is created we need to associate the subscriptionId with
    // the user in our database
    // TODO: If that user already has a subscription we need to cancel that
    // subscription and update
    // or update the priceId might work
    public void handleCustomerSubscriptionCreated(Subscription subscription) {
        String customerId = subscription.getCustomer();
        com.terabite.payment.model.Customer customer;
        if (customerId != null) {
            customer = customerRepository.findById(customerId).orElse(null);
            if (customer != null) {
                customer.setSubscriptionId(subscription.getId());
                customerRepository.save(customer);
            }
        }
    }

    // Subscription deleted means the subscription has ended
    public void handleCustomerSubscriptionDeleted(Subscription subscription) {
        UserInformation userInformation = getUserBySubscription(subscription);

        if (userInformation != null) {
            // userInformation.setSubscriptionTier(SubscriptionStatus.NO_SUBSCRIPTION);
            // userRepository.save(userInformation);

            Login login = getLoginByUserInformation(userInformation);
            if (login != null) {
                userApi.setUserSubscription(login.getEmail(), SubscriptionStatus.NO_SUBSCRIPTION, null);
            }
        }
    }

    public void handleCustomerSubscriptionUpdated(Subscription subscription) {
        UserInformation userInformation = getUserBySubscription(subscription);
        Login login = getLoginByUserInformation(userInformation);

        // Not sure about this. Should only happen if there is no user associated with
        // the subscription
        // or if there is somehow no login associated with a userinformation
        if (userInformation == null || login == null) {
            return;
        }

        /*
         * Subscription updates can mean many things, so we have to check the status of
         * the subscription before we change anything.
         * First case will be statuses that would result in losing access to content.
         */
        if (subscription.getStatus().equals("canceled")
                || subscription.getStatus().equals("paused") // paused can only happen when a free trial ends which is
                                                             // not currently a feature but may be later
                || subscription.getStatus().equals("unpaid")) {
            userApi.setUserSubscription(userInformation.getEmail(), SubscriptionStatus.NO_SUBSCRIPTION, null);
        }

        // This block will assign the new subscriptionStatus of active subs based on
        // their priceId
        else if (subscription.getStatus().equals("active")) {

            // sets the expiration date in the userInformation table
            java.util.Date time = new java.util.Date((long) subscription.getCurrentPeriodEnd() * 1000);
            // userInformation.setExpirationDate(time);

            // priceId determines subscription level.
            String priceId = subscription.getItems().getData().get(0).getPrice().getId();

            SubscriptionStatus status = SubscriptionStatus.NO_SUBSCRIPTION;
            if (priceId.equals(baseClientPriceId)) {
                status = SubscriptionStatus.BASE_CLIENT;
            }else if (priceId.equals(specificClientPriceId)) {
                status = SubscriptionStatus.SPECIFIC_CLIENT;
            }
            userApi.setUserSubscription(userInformation.getEmail(), status, time);
            // FIXME: This class should not have access to userRepository. 
            // userRepository.save(userInformation);
        }
    }

    public UserInformation getUserBySubscription(Subscription subscription) {
        String customerId = subscription.getCustomer();
        // this should never happen, I don't think subscriptions can not have a customer
        if (customerId == null) {
            return null;
        }
        com.terabite.payment.model.Customer customer = customerRepository.findById(customerId).orElse(null);

        if (customer != null) {
            UserInformation userInformation = userRepository.findByCustomer(customer).orElse(null);
            return userInformation;
        } else {
            return null;
        }
    }

    public Login getLoginByUserInformation(UserInformation userInformation) {
        String email = userInformation.getEmail();

        Login login = loginRepository.findByEmail(email).orElse(null);

        return login;
    }

}
