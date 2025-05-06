package com.example.backend.controller;

import com.example.backend.model.Handyman;
import com.example.backend.model.Services;
import com.example.backend.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:4200/")
public class ServiceController {

    @Autowired
    private ServicesService servicesService;

    @GetMapping("/all")
    public List<Services> getAllServices() {
        return servicesService.getAllServices();
    }
    @GetMapping("/all/expertise/{expertise}")
    public List<Services> getAllExpertiseServices(@PathVariable String expertise) {

        return servicesService.getAllExpertiseServices(expertise);
    }

    @GetMapping("/all/{handymanId}")
    public List<Services> getAllServices(@PathVariable("handymanId")int handymanId) {
        return servicesService.getAllServicesByHandymanId(handymanId);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Services> getServicesById(@PathVariable("id") int id){
        Services services = servicesService.findServicesById(id);
        return new ResponseEntity<>(services, HttpStatus.OK);
    }
    @PostMapping("/{handymanId}/add")//this adds a service to our handyman but it also adds the service in the database,kinder bueno 2 in 1
    public ResponseEntity<Services> addServiceToHandyman(@RequestBody Services service, @PathVariable int handymanId) {
        Services savedService = servicesService.addService(service, handymanId);
        return new ResponseEntity<>(savedService, HttpStatus.CREATED);
    }
    @PostMapping("/add")
    public ResponseEntity<Services> addServices(@RequestBody Services services){
        Services newServices =servicesService.addService(services,null);
        return new ResponseEntity<>(newServices, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Services> updateServices(@RequestBody Services services){
        Services updateServices =servicesService.updateServices(services);
        return new ResponseEntity<>(updateServices, HttpStatus.OK);
    }

    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?> deleteServices(@PathVariable("id") int id){
        servicesService.deleteServices(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/filter")
    public List<Services> getServicesByExpertise(@RequestParam String expertise) {
        return servicesService.getServicesByExpertise(expertise);
    }

    @GetMapping("/findbybookingid/{bookingId}")
    public ResponseEntity<Services> getServicesByBookingId(@PathVariable("bookingId") int bookingId){
        Services services = servicesService.findServicesByBookingId(bookingId);
        return new ResponseEntity<>(services, HttpStatus.OK);
    }


}
