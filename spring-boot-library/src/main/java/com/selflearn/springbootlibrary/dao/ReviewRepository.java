package com.selflearn.springbootlibrary.dao;

import com.selflearn.springbootlibrary.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByBookId_Id(Long bookId, Pageable pageable);

    Review findByUserEmailAndBookId_Id(String userEmail, Long bookId);


}
