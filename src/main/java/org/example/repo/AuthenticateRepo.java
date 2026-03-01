package org.example.repo;

import org.example.entity.Authenticate;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface AuthenticateRepo extends JpaRepository<Authenticate, Long> {
   boolean existsByEmail(String email) ;


    Optional<Authenticate>findByEmail(String email);
}
