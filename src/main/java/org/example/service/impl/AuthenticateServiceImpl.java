package org.example.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.config.JwtUtil;
import org.example.controller.AuthenticateController;
import org.example.dto.AuthenticateDto;
import org.example.entity.Authenticate;
import org.example.repo.AuthenticateRepo;
import org.example.service.AuthenticateService;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public  class AuthenticateServiceImpl implements AuthenticateService {
    private final AuthenticateRepo authenticateRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;



    @Transactional
    public AuthenticateDto create(AuthenticateController.RegisterRequest request){
        Authenticate register = new Authenticate();
        register.setName(request.getName());
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        register.setPassword(encodedPassword);
        register.setCity(request.getCity());
        register.setGender(request.getGender());
        if(authenticateRepo.existsByEmail(request.getEmail())){
            throw new RuntimeException("email already exist");
        }else{
            register.setEmail(request.getEmail());
        }
        return AuthenticateDto.toDto( authenticateRepo.save(register)) ;
    }
@Transactional
public AuthenticateDto getUser(String email, String password) {

    Authenticate login = authenticateRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

    if (!passwordEncoder.matches(password, login.getPassword())) {
        throw new RuntimeException("Invalid credentials");
    }

    String token = jwtUtil.generateToken(login);

    return AuthenticateDto.toLoginResponse(login, token);
}






}
