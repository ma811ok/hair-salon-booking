package com.hairsalon.controller;

import com.hairsalon.dto.StylistDTO;
import com.hairsalon.service.StylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stylists")
public class StylistController {

    private final StylistService stylistService;

    @Autowired
    public StylistController(StylistService stylistService) {
        this.stylistService = stylistService;
    }

    @GetMapping
    public ResponseEntity<List<StylistDTO>> getAllStylists() {
        return ResponseEntity.ok(stylistService.getAllStylists());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StylistDTO> getStylistById(@PathVariable Long id) {
        return ResponseEntity.ok(stylistService.getStylistById(id));
    }

    @GetMapping("/{id}/slots")
    public ResponseEntity<List<String>> getAvailableSlots(
            @PathVariable Long id,
            @RequestParam String date) {
        return ResponseEntity.ok(stylistService.getAvailableSlots(id, date));
    }
}
