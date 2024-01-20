package com.example.backend.service;


import com.example.backend.DOT.ReviewRequest;
import com.example.backend.model.Handyman;
import com.example.backend.model.Review;
import com.example.backend.model.Services;
import com.example.backend.model.User;
import com.example.backend.repo.HandymanRepo;
import com.example.backend.repo.ReviewRepo;
import com.example.backend.repo.ServiceRepo;
import com.example.backend.repo.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo reviewRepository;

    @Autowired
    private HandymanRepo handymanRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ServiceRepo serviceRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private HandymanService handymanService;

    @Autowired
    private ServicesService servicesService;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(int reviewId) {
        return reviewRepository.findById(reviewId);
    }

    public Review addReview1(ReviewRequest reviewRequest) {
        // Fetch user, handyman, and service entities from the database
        User user = userService.findUserById(reviewRequest.getUserId());
        Handyman handyman = handymanService.findHandymanById(reviewRequest.getHandymanId());
        Services service = servicesService.findServicesById(reviewRequest.getServiceId());

        // Create a new Review entity
        Review review = new Review();
        review.setUser(user);
        review.setHandyman(handyman);
        review.setService(service);
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());
        review.setReviewDateTime(LocalDateTime.now());

        // Save the review to the database
        return reviewRepository.save(review);
    }


    public Review addReview(Review review) {
        // Check and save Handyman if not yet persisted
        if (review.getHandyman() != null && review.getHandyman().getId() == null) {
            validateAndSaveHandyman(review.getHandyman());
        }

        // Check and save User if not yet persisted
        if (review.getUser() != null && review.getUser().getUser_id() == null) {
            validateAndSaveUser(review.getUser());
        }

        // Check and save Service if not yet persisted
        if (review.getService() != null && review.getService().getService_Id() == null) {
            validateAndSaveService(review.getService());
        }

        // Save the Review
        return reviewRepository.save(review);
    }

    private void validateAndSaveHandyman(Handyman handyman) {
        if (handymanRepository.findById(handyman.getId()).isEmpty()) {
            // Handyman not found, handle accordingly (throw an exception, return an error, etc.)
            throw new EntityNotFoundException("Handyman with ID " + handyman.getId() + " not found");
        }
        handymanRepository.saveAndFlush(handyman);
    }

    private void validateAndSaveUser(User user) {
        if (userRepository.findById(user.getUser_id()).isEmpty()) {
            // User not found, handle accordingly (throw an exception, return an error, etc.)
            throw new EntityNotFoundException("User with ID " + user.getUser_id() + " not found");
        }
        userRepository.saveAndFlush(user);
    }

    private void validateAndSaveService(Services service) {
        if (serviceRepository.findById(service.getService_Id()).isEmpty()) {
            // Service not found, handle accordingly (throw an exception, return an error, etc.)
            throw new EntityNotFoundException("Service with ID " + service.getService_Id() + " not found");
        }
        serviceRepository.saveAndFlush(service);
    }

    public void deleteReview(int reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    public Review updateReview(int reviewId, Review updatedReview) {
        // Additional validation or business logic can be added here
        return reviewRepository.findById(reviewId)
                .map(existingReview -> {
                    existingReview.setRating(updatedReview.getRating());
                    existingReview.setComment(updatedReview.getComment());
                    // Update other fields as needed
                    return reviewRepository.save(existingReview);
                })
                .orElse(null);
    }

    public List<Review> getAllReviewsByHandymanId(int handymanId) {
        return reviewRepository.findByHandymanId(handymanId);
    }
}
