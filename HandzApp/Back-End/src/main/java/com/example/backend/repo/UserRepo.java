package com.example.backend.repo;


import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface UserRepo extends JpaRepository<User, Integer> {


    Optional<User> findUserByUserId(int id);//in case you give a random id

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

}
