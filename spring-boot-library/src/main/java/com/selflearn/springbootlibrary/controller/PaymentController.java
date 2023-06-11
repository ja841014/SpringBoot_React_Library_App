package com.selflearn.springbootlibrary.controller;

import com.selflearn.springbootlibrary.entity.Payment;
import com.selflearn.springbootlibrary.requestmodels.PaymentInfoRequest;
import com.selflearn.springbootlibrary.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/payment-details")
    public Payment findByUserEmail(JwtAuthenticationToken jwtAuthenticationToken) throws Exception {
        System.out.println("Get findByUserEmail");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        if(userEmail == null) {
            throw new Exception("user email is missing");
        }
        return paymentService.findByUserEmail(userEmail);
    }
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException {
        System.out.println("Post createPaymentIntent");
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String payment = paymentIntent.toJson();
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }


    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(JwtAuthenticationToken jwtAuthenticationToken) throws Exception {
        System.out.println("Put stripePaymentComplete");
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        if(userEmail == null) {
            throw new Exception("user email is missing");
        }
        return paymentService.stripePayment(userEmail);

    }
}
