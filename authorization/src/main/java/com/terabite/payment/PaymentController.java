package com.terabite.payment;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/payment")
public class PaymentController {
    

    public PaymentController(){

    }

    @GetMapping("/")
    public String test(){
        return "hello";
    }
}
