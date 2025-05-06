package com.example.backend.repo;

import com.example.backend.model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookingRepo extends JpaRepository<Bookings, Integer> {


    Optional<Bookings> findBookingsByBookingId(int booking_id);

    void deleteBookingsByBookingId(int booking_id);

}
