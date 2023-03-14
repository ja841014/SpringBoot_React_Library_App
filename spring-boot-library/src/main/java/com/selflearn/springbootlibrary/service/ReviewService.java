package com.selflearn.springbootlibrary.service;

import com.selflearn.springbootlibrary.dao.ReviewRepository;
import com.selflearn.springbootlibrary.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {this.reviewRepository = reviewRepository;};


    public Page<Review> findByBookId(Long bookId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewRepository.findByBookId(bookId, pageable);
    }
}
