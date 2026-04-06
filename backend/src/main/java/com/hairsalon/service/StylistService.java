package com.hairsalon.service;

import com.hairsalon.dto.StylistDTO;
import com.hairsalon.repository.StylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StylistService {

    private final StylistRepository stylistRepository;

    @Autowired
    public StylistService(StylistRepository stylistRepository) {
        this.stylistRepository = stylistRepository;
    }

    public List<StylistDTO> getAllStylists() {
        return stylistRepository.findAll().stream()
                .map(StylistDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<StylistDTO> getActiveStylists() {
        return stylistRepository.findByIsActiveTrue().stream()
                .map(StylistDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public StylistDTO getStylistById(Long id) {
        return StylistDTO.fromEntity(
            stylistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stylist not found"))
        );
    }

    public List<String> getAvailableSlots(Long stylistId, String date) {
        List<String> allSlots = Arrays.asList(
            "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
            "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
        );
        return allSlots.stream()
                .filter(slot -> Math.random() > 0.3)
                .collect(Collectors.toList());
    }
}
