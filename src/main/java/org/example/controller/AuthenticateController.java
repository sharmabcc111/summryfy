package org.example.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.dto.AuthenticateDto;
import org.example.service.AuthenticateService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthenticateController {

    private final AuthenticateService registerService;

    @PostMapping("/register")
    public AuthenticateDto create(@RequestBody AuthenticateController.RegisterRequest request) {
        return registerService.create(request);
    }

    @Data
    public static class RegisterRequest {
        String name;
        String email;
        String password;
        String gender;
        String city;
    }

    @GetMapping("/login")
    public AuthenticateDto getUser(@RequestParam String email, @RequestParam String password) {
        return registerService.getUser(email, password);
    }
}