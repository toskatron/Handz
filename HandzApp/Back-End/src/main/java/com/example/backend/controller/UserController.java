package com.example.backend.controller;


import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUser(){
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id){
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user){
        if(userService.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Email already exists!");
        }
        User newUser =userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
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
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = IMAGE_UPLOAD_DIR + fileName;
            file.transferTo(new File(filePath));
            String filePathCut = "assets/profilePics/" + fileName;
            return new ResponseEntity<>(filePathCut,HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            String error="Image upload failed: " + e.getMessage();
            return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id){
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user) throws IllegalAccessException {
        String email = user.get("email");
        String password = user.get("password");
        try {
            User handyman = userService.findHandymanByEmail(email);
            if(!handyman.getPassword().equals(password))
                throw new IllegalAccessException("Invalid password");
            return ResponseEntity.status(HttpStatus.OK).body(handyman);
        } catch (IllegalAccessException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}