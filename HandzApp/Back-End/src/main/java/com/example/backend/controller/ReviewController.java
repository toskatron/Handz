package com.example.backend.controller;

import com.example.backend.DOT.ReviewRequest;
import com.example.backend.model.Review;
import com.example.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:4200/")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/handyman/{handymanId}")
    public ResponseEntity<List<Review>> getAllReviewsByHandymanId(@PathVariable int handymanId){
        List<Review> reviews = reviewService.getAllReviewsByHandymanId(handymanId);
        return new ResponseEntity<>(reviews,HttpStatus.OK);
    }
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable int reviewId) {
        Optional<Review> review = reviewService.getReviewById(reviewId);
        return review.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody ReviewRequest reviewRequest) {
        try {
            Review review= reviewService.addReview1(reviewRequest);
            return new ResponseEntity<>(review, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable int reviewId) {
        reviewService.deleteReview(reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable int reviewId, @RequestBody Review updatedReview) {
        Review updated = reviewService.updateReview(reviewId, updatedReview);
        return updated != null ?
                new ResponseEntity<>(updated, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
