package com.terabite.payment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Subscription;
import com.terabite.payment.model.Customer;
import com.terabite.payment.repository.CustomerRepository;
import com.terabite.user.model.UserInformation;
import com.terabite.user.repository.UserRepository;

@Service
public class CustomerService {
    CustomerRepository customerRepository;
    UserRepository userRepository;
    StripeCustomerService stripeCustomerService;

    @Value("${ADAPTED_STRENGTH_STRIPE_KEY}")
    private String stripeKey;

    @Value("${ADAPTED_STRENGTH_BASE_PRICE_ID}")
    private String baseClientPriceId;

    @Value("${ADAPTED_STRENGTH_GENERAL_PRICE_ID}")
    private String generalClientPriceId;

    @Value("${ADAPTED_STRENGTH_SPECIFIC_PRICE_ID}")
    private String specificClientPriceId;

    public CustomerService(CustomerRepository customerRepository, StripeCustomerService stripeCustomerService, UserRepository userRepository){
        this.customerRepository = customerRepository;
        this.stripeCustomerService = stripeCustomerService;
        this.userRepository = userRepository;
    }


    public Customer createNewCustomer(UserInformation userInformation) throws StripeException{
        String customerId = stripeCustomerService.createNewCustomer(userInformation.getEmail());
        Customer customer = new Customer(customerId, userInformation);
        return customer;
    }


    // This function returns 1 if the subscriptionStatus == active and 0 if the subscriptionStatus is anything else.
    // A return value of -1 indicates a resouce was not found
    public int getSubscriptionByUserId(long userId) {
        Stripe.apiKey = stripeKey;

        UserInformation userInformation = userRepository.findById(userId).orElse(null);

        if (userInformation!= null){
            Customer customer = userInformation.getCustomer();

            if(customer!=null){
                String subscriptionId = customer.getSubscriptionId();

                if(subscriptionId!=null){
                    try{
                        Subscription subscription = Subscription.retrieve(subscriptionId);
                        if (subscription.getStatus() == "active") {
                            return 1;
                        }
                    }
                    catch (StripeException e){
                        e.printStackTrace();
                    }   
                }
                else{
                    return -1;
                }
            }
            else{
                return -1;
            }
        }
        else{
            return -1;
        }
        return 0;
    }


    /*  
        This function returns a 0 if the user is unsubscribed, a 1 if the client is a base client,
        a 2 if the client is a general client, and a 3 if the user is a specific client
        A negative number indicates a resource was not found 
    */
    public int getSubscriptionLevelByUserId(long userId){
        Stripe.apiKey = stripeKey;

        UserInformation userInformation = userRepository.findById(userId).orElse(null);
        if(userInformation!= null){
            Customer customer = userInformation.getCustomer();
            if(customer!= null){
                String subscriptionId = customer.getSubscriptionId();
                if(subscriptionId!=null){
                    try{
                        Subscription subscription = Subscription.retrieve(subscriptionId);
                        String priceId = subscription.getItems().getData().get(6).getPrice().getId();
                        if(priceId == baseClientPriceId){
                            return 1;
                        }
                        else if (priceId == generalClientPriceId){
                            return 2;
                        }
                        else if (priceId == specificClientPriceId){
                            return 3;
                        }
                        else{
                            return -1;  //price id does not match one of the three tiers offered. Not sure how this could happen
                        }
                        
                    }
                    catch(StripeException e){
                        e.printStackTrace();
                    }
                }
                else{
                    return 0;  //no subscriptionId means user is not subscribed
                }
            }
            else{ 
                return -2; //customer was not found
            }
        }
        else{
            return -3; //userInformation was not found
        }
        return -4; //
    }
}
