package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "Handymans")
@JsonIgnoreProperties("bookings") // Add this line to break the loop
public class Handyman implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int handymanId;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String imageURL;
    @Column
    private String expertise;
    @Column
    private int phoneNumber;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "handyman_services", // A join table for the many-to-many relationship
            joinColumns = @JoinColumn(name = "handyman_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private Set<Services> services = new HashSet<>();

    @OneToMany(mappedBy = "handyman", fetch = FetchType.LAZY)
    private Set<Bookings> bookings;


    @Override
    public String toString() {
        return "Handyman{" +
                "handyman_id=" + handymanId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", services=" + services +
                ", bookings=" + bookings +
                '}';
    }

    public Handyman() {
    }

    public Handyman(int handymanId, String name, String email, String password, String imageURL, String expertise, int phoneNumber, Set<Services> services, Set<Bookings> bookings) {
        this.handymanId = handymanId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.imageURL = imageURL;
        this.expertise = expertise;
        this.phoneNumber = phoneNumber;
        this.services = services;
        this.bookings = bookings;
    }

    public int getHandymanId() {
        return handymanId;
    }

    public void setHandymanId(int handymanId) {
        this.handymanId = handymanId;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public Integer getId(){return handymanId;}

    public Set<Bookings> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Bookings> bookings) {
        this.bookings = bookings;
    }

    public int getHandyman_id() {
        return handymanId;
    }

    public void setHandyman_id(int handyman_id) {
        this.handymanId = handyman_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<Services> getServices() {
        return services;
    }

    public void setServices(Set<Services> services) {
        this.services = services;
    }







}
