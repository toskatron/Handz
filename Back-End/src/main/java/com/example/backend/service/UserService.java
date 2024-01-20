package com.example.backend.service;

import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.Handyman;
import com.example.backend.model.User;
import com.example.backend.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    public User addUser(User User){
        return userRepo.save(User);
    }

    public List<User> findAllUsers(){
        return userRepo.findAll();
    }
    public User updateUser(User User){
        return userRepo.save(User);
    }

    public User findUserById(int id){
        return userRepo.findUserByUserId(id)
                .orElseThrow(() -> new UserNotFoundException("User by id:"+id+" was not found"));
    }
    public void deleteUser(int id){

        userRepo.findUserByUserId(id).ifPresent(userRepo::delete);
    }

    public User findHandymanByEmail(String email){
        return userRepo.findByEmail(email).orElseThrow();
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }
}
