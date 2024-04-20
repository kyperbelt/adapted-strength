package com.terabite.payment.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.terabite.payment.service.PaymentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;





@RestController
@RequestMapping("/v1/payments")
public class PaymentController {
    private PaymentService paymentService;

    public PaymentController(PaymentService paymentService){
        this.paymentService = paymentService;
    }


    @PostMapping("/cancel_subscription")
    public ResponseEntity<?> cancelSubscriptionById(@AuthenticationPrincipal UserDetails userDetails) throws StripeException {
        return paymentService.cancelSubscriptionById(userDetails.getUsername());
    }
    
    @PostMapping("/create_checkout_session/{subLevel}")
    public ResponseEntity<?> createCheckoutSession(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("subLevel") String subLevel) throws StripeException{
        if(userDetails!=null){
            return paymentService.createCheckoutSession(userDetails.getUsername(), subLevel);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/change_subscription_level/{subLevel}")
    public ResponseEntity<?> changeSubscriptionLevel(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("subLevel") String subLevel) throws StripeException{
        if(userDetails!= null && subLevel != null){
            return paymentService.changeSubscriptionLevel(userDetails.getUsername(), subLevel);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //returns true if user has an active subscription, false otherwise
    @GetMapping("/getActiveSubscriptionStatus")
    public ResponseEntity<?> getActiveSubscriptionStatus(@AuthenticationPrincipal UserDetails userDetails) throws StripeException{
        if(userDetails !=null){
            return paymentService.getActiveSubscriptionStatus(userDetails.getUsername());
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
