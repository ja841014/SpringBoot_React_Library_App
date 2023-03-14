package com.selflearn.springbootlibrary.dao;

import com.selflearn.springbootlibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    // we want to count how many books does this user currently check out
    List<Checkout> findBookByUserEmail(String userEmail);
}
