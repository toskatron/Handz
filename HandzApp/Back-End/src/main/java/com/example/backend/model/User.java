package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Set;


@Entity
@Table(name = "Users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private int userId;
    private String name;
    private String email;
    private String password;
    private String imageURL;
    private int phoneNumber;
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Bookings> bookings;

    public User() {

    }

    public User(int user_id, String name, String email, String password,
                String imageURL, int phoneNumber, Set<Bookings> bookings) {
        this.userId = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.imageURL = imageURL;
        this.phoneNumber = phoneNumber;
        this.bookings = bookings;
    }

    public Integer getUser_id() {
        return userId;
    }

    public void setUser_id(int user_id) {
        this.userId = user_id;
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

    public Set<Bookings> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Bookings> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", imageURL='" + imageURL + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", bookings=" + bookings +
                '}';
    }
}
