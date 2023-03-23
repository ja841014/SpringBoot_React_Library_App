package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.ReviewRepository;
import com.selflearn.springbootlibrary.entity.Review;
import com.selflearn.springbootlibrary.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {
    private ReviewRepository reviewRepository;
    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    };

    public Page<Review> findByBookId(Long bookId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewRepository.findByBookId(bookId, pageable);
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception{
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        if(validateReview != null) {
            throw new Exception("Review already created");
        }
        Review review = new Review(reviewRequest.getBookId(),
                reviewRequest.getRating(),
                userEmail,
                reviewRequest.getReviewDescription().orElse(null),
                Date.valueOf(LocalDate.now())
        );
        reviewRepository.save(review);
    }

    public Boolean userReviewedLeft(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail,bookId);
        if(validateReview != null) {
            return true;
        }
        return false;
    }


}
