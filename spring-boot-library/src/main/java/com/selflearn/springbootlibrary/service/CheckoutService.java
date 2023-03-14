package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.BookRepository;
import com.selflearn.springbootlibrary.dao.CheckoutRepository;
import com.selflearn.springbootlibrary.entity.Checkout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CheckoutService {

    private CheckoutRepository checkoutRepository;
    @Autowired
    public CheckoutService(CheckoutRepository checkoutRepository) {this.checkoutRepository = checkoutRepository;};


}
