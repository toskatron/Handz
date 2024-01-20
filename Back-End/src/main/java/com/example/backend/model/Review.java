package com.example.backend.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reviews")
public class Review implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reviewId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Handyman handyman;

    @ManyToOne
    private Services service;

    private int rating; // Assuming a rating from 1 to 5
    private String comment;
    private LocalDateTime reviewDateTime;

    public Review() {
    }



    public Review(int reviewId, User user, Handyman handyman, Services service, int rating, String comment, LocalDateTime reviewDateTime) {
        this.reviewId = reviewId;
        this.user = user;
        this.handyman = handyman;
        this.service = service;
        this.rating = rating;
        this.comment = comment;
        this.reviewDateTime = reviewDateTime;
    }

    @Override
    public String toString() {
        return "Review{" +
                "reviewId=" + reviewId +
                ", user=" + user +
                ", handyman=" + handyman +
                ", service=" + service +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", reviewDateTime=" + reviewDateTime +
                '}';
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Handyman getHandyman() {
        return handyman;
    }

    public void setHandyman(Handyman handyman) {
        this.handyman = handyman;
    }

    public Services getService() {
        return service;
    }

    public void setService(Services service) {
        this.service = service;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getReviewDateTime() {
        return reviewDateTime;
    }

    public void setReviewDateTime(LocalDateTime reviewDateTime) {
        this.reviewDateTime = reviewDateTime;
    }
}

