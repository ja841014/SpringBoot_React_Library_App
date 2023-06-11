package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.PaymentRepository;
import com.selflearn.springbootlibrary.entity.Payment;
import com.selflearn.springbootlibrary.requestmodels.PaymentInfoRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class PaymentService {
    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.paymentRepository = paymentRepository;
        Stripe.apiKey = secretKey;
    }

    public Payment findByUserEmail(String userEmail) {
        return paymentRepository.findByUserEmail(userEmail);
    }

    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {

        List<String> paymentMethodTypes = new ArrayList<>(Arrays.asList("card"));

        Map<String, Object> params = new HashMap<>(
            Map.of(
                    "amount", paymentInfoRequest.getAmount(),
                    "currency", paymentInfoRequest.getCurrency(),
                    "payment_method_types", paymentMethodTypes
            )
        );

        return PaymentIntent.create(params);

    }

    public ResponseEntity<String> stripePayment(String userEmail) throws  Exception {
        Payment payment = paymentRepository.findByUserEmail(userEmail);
        if(payment == null) {
            throw new Exception("Payment information is missing");
        }
        payment.setAmount(00.00);
        paymentRepository.save(payment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
