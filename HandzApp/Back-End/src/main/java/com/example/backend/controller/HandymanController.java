package com.example.backend.controller;

import com.example.backend.model.Handyman;
import com.example.backend.model.Services;
import com.example.backend.service.HandymanService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/handyman")
@CrossOrigin(origins = "http://localhost:4200/")
public class HandymanController {
    private final HandymanService handymanService;
    public HandymanController(HandymanService handymanService) {
        this.handymanService = handymanService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Handyman>> getAllHands(){
        List<Handyman> handymen = handymanService.findAllHandymans();
        return new ResponseEntity<>(handymen, HttpStatus.OK);
    }

    private static final String IMAGE_UPLOAD_DIR = "D:/PersonalLearning/Projects/Licenta/Front-End/src/assets/profilePics/";

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("profileImage") MultipartFile file) {
        try {
            // Ensure the directory exists, or create it if necessary
            File directory = new File(IMAGE_UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate a unique filename for the uploaded image
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            // Construct the file path to save the image
            String filePath = IMAGE_UPLOAD_DIR + fileName;

            // Save the image to the specified directory
            file.transferTo(new File(filePath));
            String filePathCut = "assets/profilePics/" + fileName;

            // Return the saved file path or any other response as needed
            return new ResponseEntity<>(filePathCut,HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle any exceptions that may occur during file upload
            String error="Image upload failed: " + e.getMessage();
            //create string for corect output:asstets/smth
            return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("findbybookingid/{bookingId}")
    public ResponseEntity<Handyman> getHandymanByBookingId(@PathVariable("bookingId") int bookingId){
        Handyman handyman = handymanService.findHandymanByBookingId(bookingId);
        return new ResponseEntity<>(handyman, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Handyman> getHandymanById(@PathVariable("id") int id){
        Handyman handyman = handymanService.findHandymanById(id);
        return new ResponseEntity<>(handyman, HttpStatus.OK);
    }
    @GetMapping("/{expertise}")
    public ResponseEntity<?> getHandymanByExpertise(@PathVariable("expertise") String expertise){
        List<Handyman> handymen = handymanService.findExpertiseHandyman(expertise);
        return new ResponseEntity<>(handymen,HttpStatus.OK);

    }
    @PostMapping("/add")
    public ResponseEntity<?> addHandyman(@RequestBody Handyman handyman){
        // Check for duplicate email before saving
        if(handymanService.existsByEmail(handyman.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Email already exists!");
        }

        Handyman newHandyman = handymanService.addHandyman(handyman);

        if(newHandyman == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Handyman could not be created");
        }

        return new ResponseEntity<>(newHandyman,HttpStatus.CREATED);
    }
    @PostMapping("/{handymanId}/addService")
    public ResponseEntity<Handyman> addCreatedServiceToHandyman(@PathVariable int handymanId, @RequestBody Services service) {
        Handyman updatedHandyman = handymanService.addCreatedServiceToHandyman(handymanId, service);
        return new ResponseEntity<>(updatedHandyman, HttpStatus.OK);
    }

    @PostMapping("/addService")
    public ResponseEntity<String> addServiceToHandyman(@RequestParam int handymanId, @RequestParam int serviceId) {
        try {
            handymanService.addServiceToHandyman(handymanId, serviceId);
            return ResponseEntity.ok("Service added successfully.");
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding service to handyman.");
        }
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<Handyman> updateHandyman(@PathVariable Long id, @RequestBody Handyman handyman){
        Handyman updateHandyman =handymanService.updateHandyman(id, handyman);
        return new ResponseEntity<>(updateHandyman, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{handymanID}/{serviceID}")
    public void deleteServiceFromHandyman(@PathVariable int handymanID,@PathVariable int serviceID){

        handymanService.deleteServiceFromHanyman(handymanID,serviceID);
    }
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?> deleteHandyman(@PathVariable("id") int id){
        handymanService.deleteHandyman(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/allServices/{handymanId}")//this method returns all the services a handyman has
    public Set<Services> getServicesByHandymanId(@PathVariable Integer handymanId) {
        return handymanService.getServicesByHandymanId(handymanId);
    }
    @GetMapping("/all/{serviceId}")//this method returns all the handymen a service has(by id)
    public Set<Handyman> getHandymenByServiceId(@PathVariable Integer serviceId) {
        return handymanService.getHandymenByServiceId(serviceId);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) throws IllegalAccessException {
        String email = user.get("email");
        String password = user.get("password");
        try {
            Handyman handyman = handymanService.findHandymanByEmail(email);
            if(!handyman.getPassword().equals(password)) {
                throw new IllegalAccessException("Invalid password");
            }
            return ResponseEntity.status(HttpStatus.OK).body(handyman);
        } catch (IllegalAccessException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}