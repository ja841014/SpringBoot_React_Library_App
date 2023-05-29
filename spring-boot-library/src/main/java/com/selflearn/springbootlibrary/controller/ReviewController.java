package com.selflearn.springbootlibrary.controller;

import com.selflearn.springbootlibrary.entity.Review;
import com.selflearn.springbootlibrary.requestmodels.ReviewRequest;
import com.selflearn.springbootlibrary.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;
    @Autowired
    public ReviewController(ReviewService reviewService) {this.reviewService = reviewService;};

    /*
    * Get all reviews by this book
    * */
    @GetMapping("/books/{id}")
    public Page<Review> findByBookId(@PathVariable("id") Long bookId, int page, int size) {
        System.out.println("Get /reviews/books/{id}: " + bookId );
        return reviewService.findByBookId_Id(bookId, page, size);
    }

    /*
    * Post a new review for this book
    * */
    @PostMapping("/secure/review")
    public void postReview(@RequestBody ReviewRequest reviewRequest,
            JwtAuthenticationToken jwtAuthenticationToken) throws Exception {
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        System.out.println(reviewRequest.getBook());
        System.out.println("Post /reviews/secure/review: " + reviewRequest.getReviewDescription().orElse(null));
        if(userEmail == null) {
            throw new Exception("userEmail is null");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }

    /*
    * Get user whether leave review or not
    * */
    @GetMapping("/secure/books")
    public Boolean userReviewedLeft(@RequestParam Long bookId,
                                 JwtAuthenticationToken jwtAuthenticationToken) throws Exception{
        String userEmail = jwtAuthenticationToken.getToken().getSubject();
        System.out.println("Get /reviews/secure/books: ");
        if(userEmail == null) {
            throw new Exception("userEmail is null");
        }

        return reviewService.userReviewedLeft(userEmail, bookId);

    }
}
