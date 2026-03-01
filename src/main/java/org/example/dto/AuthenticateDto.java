package org.example.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.example.entity.Authenticate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticateDto {

    Long id;
    String name;
    String email;
    String password;
    String gender;
    String city;
    String token;

    public static AuthenticateDto toDto(Authenticate register){
        AuthenticateDto dto = new AuthenticateDto();
        dto.setId(register.getId());
        dto.setName(register.getName());
        dto.setEmail(register.getEmail());
        dto.setCity(register.getCity());
        dto.setPassword(register.getPassword());
        dto.setGender(register.getGender());
        return dto;
    }
    public static AuthenticateDto toLoginResponse(Authenticate user, String token) {

        AuthenticateDto dto = new AuthenticateDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setCity(user.getCity());
        dto.setGender(user.getGender());
        dto.setToken(token);

        return dto;
    }

}