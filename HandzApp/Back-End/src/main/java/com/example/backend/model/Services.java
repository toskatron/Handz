package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Services implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceId;
    private String name;
    private String expertise;
    private String availability;
    private int pricing;
    private String description;

    @ManyToMany(mappedBy = "services", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Handyman> handymen = new HashSet<>();

    public Services() {
    }

    public Services(Integer serviceId, String name, String expertise, String availability, int pricing, String description, Set<Handyman> handymen) {
        this.serviceId = serviceId;
        this.name = name;
        this.expertise = expertise;
        this.availability = availability;
        this.pricing = pricing;
        this.description = description;
        this.handymen = handymen;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getService_Id() {
        return serviceId;
    }

    public void setService_Id(Integer service_Id) {
        this.serviceId = service_Id;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public int getPricing() {
        return pricing;
    }

    public void setPricing(int pricing) {
        this.pricing = pricing;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Handyman> getHandymen() {
        return handymen;
    }

    public void setHandymen(Set<Handyman> handymen) {
        this.handymen = handymen;
    }

    @Override
    public String toString() {
        return "Services{" +
                "serviceId=" + serviceId +
                ", expertise='" + expertise + '\'' +
                ", availability='" + availability + '\'' +
                ", pricing=" + pricing +
                ", description='" + description + '\'' +
                ", handymen=" + handymen +
                '}';
    }
}

