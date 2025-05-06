package com.example.backend.DOT;

public class BookingEmRequest {
    private Integer userId;
    private String expertise;
    private String status;

    public BookingEmRequest(Integer userId, String expertise, String status) {
        this.userId = userId;
        this.expertise = expertise;
        this.status = status;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
