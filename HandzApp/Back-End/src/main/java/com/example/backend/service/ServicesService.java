package com.example.backend.service;


import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.Handyman;
import com.example.backend.model.Services;
import com.example.backend.repo.HandymanRepo;
import com.example.backend.repo.ServiceRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicesService {
    private final ServiceRepo servicesRepo;
    @Autowired
    public ServicesService(ServiceRepo serviceRepo) {
        this.servicesRepo = serviceRepo;
    }
    @Autowired
    private HandymanRepo handymanRepository;
    public List<Services> getAllServices() {
        return servicesRepo.findAll();
    }
    public List<Services> getServicesByExpertise(String expertise) {
        return servicesRepo.findByExpertise(expertise);
    }
    //public Services addServices(Services services){return servicesRepo.save(services);}

    public Services addService(Services service, Integer handymanId) {
        // Additional validation or business logic can be added here
        Services savedService = servicesRepo.save(service);

        if (handymanId != null) {
            Handyman handyman = handymanRepository.findById(handymanId)
                    .orElseThrow(() -> new EntityNotFoundException("Handyman with ID " + handymanId + " not found"));

            handyman.getServices().add(savedService);
            savedService.getHandymen().add(handyman);

            handymanRepository.save(handyman);  // Save the updated Handyman
            servicesRepo.save(savedService);  // Save the updated Service
        }

        return savedService;
    }
    public Services updateServices(Services services){
        return servicesRepo.save(services);
    }

    public Services findServicesById(int id){
        return servicesRepo.findServicesByServiceId(id)
                .orElseThrow(() -> new UserNotFoundException("Service by id:"+id+" was not found"));
    }
    public void deleteServices(int id){
        servicesRepo.deleteServicesByServiceId(id);
    }


    public List<Services> getAllServicesByHandymanId(int handymanId) {
        Optional<Handyman> handyman = handymanRepository.findById(handymanId);
        if (handyman.isPresent()) {
            return new ArrayList<>(handyman.get().getServices());
        } else {
            // Handle the case where the handyman does not exist
            return new ArrayList<>();
        }
    }

    public Services findServicesByBookingId(int bookingId) {
        return servicesRepo.findServicesByBookingId(bookingId);
    }

    public List<Services> getAllExpertiseServices(String expertise) {
        return servicesRepo.findByExpertise(expertise);
    }


}
