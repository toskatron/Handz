package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "Bookings")
public class Bookings implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "handyman_id")
    private Handyman handyman;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Services service;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonProperty("bookingTime")
    private LocalDateTime bookingTime;

    @JsonProperty("status")
    private String status;

    public Bookings() {
    }

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
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

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Bookings(Integer bookingId, User user, Handyman handyman, Services service, LocalDateTime bookingTime, String status) {
        this.bookingId = bookingId;
        this.user = user;
        this.handyman = handyman;
        this.service = service;
        this.bookingTime = bookingTime;
        this.status = status;
    }
}
