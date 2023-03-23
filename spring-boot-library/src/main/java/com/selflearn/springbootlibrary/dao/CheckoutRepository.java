package com.selflearn.springbootlibrary.dao;

import com.selflearn.springbootlibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId_Id(String userEmail, Long bookId);

    // we want to count how many books does this user currently check out
    // Any text between find (or other introducing keywords) and By is considered to be descriptive
    // unless using one of the result-limiting keywords such as a Distinct to set a distinct flag on the query to be created
    // or Top/First to limit query results.
    List<Checkout> findBookByUserEmail(String userEmail);

    void deleteById(Long checkoutId);
}
