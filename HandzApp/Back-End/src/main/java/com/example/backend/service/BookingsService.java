package com.example.backend.service;

import com.example.backend.DOT.BookingEmRequest;
import com.example.backend.DOT.BookingRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.Bookings;
import com.example.backend.model.*;
import com.example.backend.repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BookingsService {
    private final BookingRepo bookingRepo;
    @Autowired
    private EmailService emailService;
    private final HandymanService handymanService; // Inject HandymanService
    private final UserService userService; // Inject UserService
    private final ServicesService servicesService; // Inject ServicesService
    private static final Logger logger = LoggerFactory.getLogger(BookingsService.class);

    public BookingsService(BookingRepo bookingRepo, HandymanService handymanService, UserService userService, ServicesService servicesService) {
        this.bookingRepo = bookingRepo;
        this.handymanService = handymanService;
        this.userService = userService;
        this.servicesService = servicesService;
    }

    public Bookings addBooking333(Bookings booking){
        return bookingRepo.save(booking);
    }

    public Bookings addEmergency(BookingEmRequest bookingEm) {
        User user = userService.findUserById(bookingEm.getUserId());
        Bookings booking = new Bookings();
        booking.setUser(user);
        booking.setHandyman(null);
        booking.setService(null);


        return null;
    }
    public Bookings addBooking(BookingRequest bookingRequest) {
        // Fetch user, handyman, and service entities from the database
        User user = userService.findUserById(bookingRequest.getUserId());
        Handyman handyman = handymanService.findHandymanById(bookingRequest.getHandymanId());
        Services service = servicesService.findServicesById(bookingRequest.getServiceId());

        // Create a new Booking entity
        Bookings booking = new Bookings();
        booking.setUser(user);
        booking.setHandyman(handyman);
        booking.setService(service);
        booking.setBookingTime(bookingRequest.getBookingTime()); // You can replace this with the actual booking time from the request
        booking.setStatus("pending");
        //sendConfirmationEmailToHandyman(handyman.getEmail(), booking);
        // Save the booking to the database
        return bookingRepo.save(booking);
    }

    private void sendConfirmationEmailToHandyman(String handymanEmail, Bookings booking) {
        String subject = "Booking Confirmation Required";
        String body = "Dear Handyman, a new booking requires your confirmation.\n" +
                "Booking for: " + booking.getService().getDescription() + "\n" +
                "Date: "+booking.getBookingTime()+"\n"+
                "Please click on the following links to confirm or decline the booking:\n" +
                "- Accept: http://localhost:8080/api/bookings/confirm-booking/" + booking.getBookingId() + "\n" +
                "- Decline: http://localhost:8080/api/bookings/decline-booking/" + booking.getBookingId();
        emailService.sendConfirmationEmail(handymanEmail, subject, body);
    }

    public void confirmBooking(Integer bookingId) {
        // Retrieve the booking from the database
        Optional<Bookings> optionalBooking = bookingRepo.findById(bookingId);

        if (optionalBooking.isPresent()) {
            Bookings booking = optionalBooking.get();
            booking.setStatus("Confirmed");
            bookingRepo.save(booking);
        } else {
            // Handle case where the booking is not found
        }
    }

    public void declineBooking(Integer bookingId) {
        // Retrieve the booking from the database
        Optional<Bookings> optionalBooking = bookingRepo.findById(bookingId);

        if (optionalBooking.isPresent()) {
            Bookings booking = optionalBooking.get();
            booking.setStatus("Declined");
            bookingRepo.save(booking);
        } else {
            // Handle case where the booking is not found
        }
    }





    public List<Bookings> findAllBookings(){
        return bookingRepo.findAll();
    }
    public Bookings updateBookings(Bookings bookingRequest){

        return bookingRepo.save(bookingRequest);
    }
    public Bookings updateBookings(BookingRequest bookingRequest,int bookingId){
        User user = userService.findUserById(bookingRequest.getUserId());
        Handyman handyman = handymanService.findHandymanById(bookingRequest.getHandymanId());
        Services service = servicesService.findServicesById(bookingRequest.getServiceId());
        Bookings booking = findBookingsById(bookingId);
        booking.setUser(user);
        booking.setHandyman(handyman);
        booking.setService(service);
        booking.setBookingTime(bookingRequest.getBookingTime()); // You can replace this with the actual booking time from the request
        booking.setStatus(bookingRequest.getStatus());

        return bookingRepo.save(booking);
    }
    public Bookings findBookingsById(int booking_id){
        return bookingRepo.findBookingsByBookingId(booking_id)
                .orElseThrow(() -> new UserNotFoundException("Handymen by booking_id:"+booking_id+" was not found"));
    }
    @Transactional
    public void deleteBookings(int booking_id){
        bookingRepo.deleteBookingsByBookingId(booking_id);
    }

    public String getBookingStatus(Integer bookingId) {
        Optional<Bookings> optionalBooking = bookingRepo.findById(bookingId);

        return optionalBooking.map(Bookings::getStatus).orElse(null);
    }
    public Bookings add123Booking(Integer userId, Integer handymanId, Integer serviceId) {
        Bookings newBooking = new Bookings();
        logger.info("Attempting to find Handyman by ID----: {}", handymanId);

        Handyman handyman = handymanService.findHandymanById(handymanId);
        //logger.info("Found Handyman: {}", handyman);

        User user = userService.findUserById(userId);
        Services services = servicesService.findServicesById(serviceId);

        newBooking.setUser(user);  // Assuming you have a constructor in User that accepts userId
        newBooking.setHandyman(handyman);  // Assuming you have a constructor in Handyman that accepts handymanId
        newBooking.setService(services);  // Assuming you have a constructor in Services that accepts serviceId

        newBooking.setStatus("Pending");
        newBooking.setBookingTime(LocalDateTime.now());



        return bookingRepo.save(newBooking);
    }

    public List<Bookings> findAllBookingsByUserId(int userId) {
        return bookingRepo.findAll().stream()
                .filter(booking -> booking.getUser().getUser_id() == userId)
                .collect(Collectors.toList());
    }

    public List<Bookings> findBookingsByHandymanId(int handymanId) {
        return bookingRepo.findAll().stream()
                .filter(booking -> booking.getHandyman().getHandyman_id() == handymanId)
                .collect(Collectors.toList());
    }


}
