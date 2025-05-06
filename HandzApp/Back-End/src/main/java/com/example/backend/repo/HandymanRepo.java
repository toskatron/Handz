package com.example.backend.repo;

import com.example.backend.model.Handyman;
import com.example.backend.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface HandymanRepo extends JpaRepository<Handyman, Integer> {
    Optional<Handyman> findByHandymanId(Integer handymanId);
    Optional<Handyman> findByHandymanId(int id);
    Optional<Handyman> findByEmail(String email);
    boolean existsByEmail(String email);
    @Query("SELECT DISTINCT h FROM Handyman h JOIN h.services s WHERE s.expertise = :expertise")
    List<Handyman> findByServiceExpertise(@Param("expertise") String expertise);

    @Query("SELECT DISTINCT h from Handyman h JOIN h.bookings b WHERE b.bookingId = :bookingId")
    Handyman findByBookingId(int bookingId);
}
