package com.hairsalon.service;

import com.hairsalon.config.JwtConfig;
import com.hairsalon.dto.*;
import com.hairsalon.model.User;
import com.hairsalon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtConfig jwtConfig) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtConfig = jwtConfig;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtConfig.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, UserDTO.fromEntity(user));
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.CUSTOMER);

        user = userRepository.save(user);
        String token = jwtConfig.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, UserDTO.fromEntity(user));
    }

    public UserDTO getCurrentUser(User user) {
        return UserDTO.fromEntity(user);
    }

    public UserDTO updateProfile(User user, String name, String phone) {
        if (name != null && !name.isEmpty()) user.setName(name);
        if (phone != null && !phone.isEmpty()) user.setPhone(phone);
        user = userRepository.save(user);
        return UserDTO.fromEntity(user);
    }

    public void changePassword(User user, String currentPassword, String newPassword) {
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
