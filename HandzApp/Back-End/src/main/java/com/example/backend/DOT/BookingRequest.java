package com.example.backend.DOT;

import java.time.LocalDateTime;

public class BookingRequest {
    private Integer userId;
    private Integer serviceId;
    private Integer handymanId;
    private LocalDateTime bookingTime;
    private String status;

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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public Integer getHandymanId() {
        return handymanId;
    }

    public void setHandymanId(Integer handymanId) {
        this.handymanId = handymanId;
    }
}
