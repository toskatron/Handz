package com.example.backend.service;

import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.Handyman;
import com.example.backend.model.Services;
import com.example.backend.repo.HandymanRepo;
import com.example.backend.repo.ServiceRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class HandymanService {
    private final HandymanRepo handymanRepo;
    @Autowired
    private ServiceRepo serviceRepo;
    @Autowired
    public HandymanService(HandymanRepo handymanRepo) {
        this.handymanRepo = handymanRepo;
    }

    //the big 5
    public Handyman addHandyman(Handyman handyman){
        return handymanRepo.save(handyman);
    }


    public Handyman addCreatedServiceToHandyman(int handymanId, Services service) {
        //can also be copied for making a booking ;*
        Handyman handyman = handymanRepo.findById(handymanId)
                .orElseThrow(() -> new EntityNotFoundException("Handyman with ID " + handymanId + " not found"));

        handyman.getServices().add(service);
        service.getHandymen().add(handyman);

        handymanRepo.save(handyman);  // Save the updated Handyman
        return handyman;
    }
    public void addServiceToHandyman(int handymanId, int serviceId) {
        Handyman handyman = handymanRepo.findById(handymanId)
                .orElseThrow(() -> new EntityNotFoundException("Handyman with ID " + handymanId + " not found"));

        Services service = serviceRepo.findById(serviceId)
                .orElseThrow(() -> new EntityNotFoundException("Service with ID " + serviceId + " not found"));

        handyman.getServices().add(service);
        service.getHandymen().add(handyman);

        handymanRepo.save(handyman);  // Save the updated Handyman
        serviceRepo.save(service);
    }

    public List<Handyman> findAllHandymans(){
        return handymanRepo.findAll();
    }
    public Handyman updateHandyman(Long id, Handyman updatedHandyman){

        Handyman existingHandyman = handymanRepo.findById(Math.toIntExact(id))
                .orElseThrow(() -> new EntityNotFoundException("Handyman not found with id: " + id));

        existingHandyman.setName(updatedHandyman.getName());
        existingHandyman.setEmail(updatedHandyman.getEmail());
        existingHandyman.setPassword(updatedHandyman.getPassword());
        existingHandyman.setImageURL(updatedHandyman.getImageURL());
        existingHandyman.setPhoneNumber(updatedHandyman.getPhoneNumber());

        existingHandyman.setServices(updatedHandyman.getServices());
        existingHandyman.setBookings(updatedHandyman.getBookings());

        return handymanRepo.save(existingHandyman);
    }

    public Handyman findHandymanById(int id){
        return handymanRepo.findByHandymanId(id)
                .orElseThrow(() -> new UserNotFoundException("Handymen by id:"+id+" wasssssssss not found"));
    }

    public Handyman findHandymanByEmail(String email){
        return handymanRepo.findByEmail(email).orElseThrow();
    }

    public void deleteHandyman(int id){

        handymanRepo.findByHandymanId(id).ifPresent(handymanRepo::delete);
    }
    //end of big 5
    public Set<Services> getServicesByHandymanId(Integer handymanId) {
        return handymanRepo.findByHandymanId(handymanId)
                .map(Handyman::getServices) // Get the set of services for the handyman
                .orElse(Collections.emptySet()); // Return an empty set if the handyman is not found
    }
    public Set<Handyman> getHandymenByServiceId(Integer serviceId) {
        return serviceRepo.findById(serviceId)
                .map(Services::getHandymen) // Get the set of handymen for the service
                .orElse(Collections.emptySet()); // Return an empty set if the service is not found
    }

    public Optional<Handyman> authHandyman(String email, String password){
        Optional<Handyman> handymanOptional = handymanRepo.findByEmail(email);

        if (handymanOptional.isPresent() && handymanOptional.get().getPassword().equals(password)) {
            return handymanOptional;
        }

        return Optional.empty();
    }

    public boolean existsByEmail(String email) {
        return handymanRepo.existsByEmail(email);
    }

    public List<Handyman> findExpertiseHandyman(String expertise) {
        return handymanRepo.findByServiceExpertise(expertise);
    }

    public Handyman findHandymanByBookingId(int bookingId) {
        return handymanRepo.findByBookingId(bookingId);
    }
}
