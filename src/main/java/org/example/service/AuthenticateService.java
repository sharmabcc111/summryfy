package org.example.service;

import org.example.controller.AuthenticateController;
import org.example.dto.AuthenticateDto;

public interface AuthenticateService {
    AuthenticateDto create(AuthenticateController.RegisterRequest request);

 AuthenticateDto getUser(String email, String password);
}