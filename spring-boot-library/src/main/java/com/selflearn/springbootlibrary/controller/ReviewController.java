package com.selflearn.springbootlibrary.controller;

import com.selflearn.springbootlibrary.entity.Review;
import com.selflearn.springbootlibrary.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;

public class ReviewController {

    private ReviewService reviewService;
    @Autowired
    public ReviewController(ReviewService reviewService) {this.reviewService = reviewService;};

    @GetMapping("/reviews")
    public Page<Review> findByBookId(Long bookId, int page, int size) {
        System.out.println("findByBookId: " + bookId + ", " + page + ", " + size);
        return reviewService.findByBookId(bookId, page, size);
    }
}
