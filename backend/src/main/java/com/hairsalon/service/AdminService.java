package com.hairsalon.service;

import com.hairsalon.dto.BookingDTO;
import com.hairsalon.dto.UserDTO;
import com.hairsalon.model.User;
import com.hairsalon.repository.BookingRepository;
import com.hairsalon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public AdminService(UserRepository userRepository, BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getRole() != null) user.setRole(User.Role.valueOf(dto.getRole()));

        user = userRepository.save(user);
        return UserDTO.fromEntity(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    public Map<String, Object> getStats() {
        long totalUsers = userRepository.count();
        long totalBookings = bookingRepository.count();
        List<BookingDTO> recentBookings = bookingRepository.findAll().stream()
                .limit(5)
                .map(BookingDTO::fromEntity)
                .collect(Collectors.toList());

        return Map.of(
            "totalUsers", totalUsers,
            "totalBookings", totalBookings,
            "revenue", 0,
            "growth", 15,
            "recentBookings", recentBookings
        );
    }
}
