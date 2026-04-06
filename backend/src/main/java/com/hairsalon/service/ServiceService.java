package com.hairsalon.service;

import com.hairsalon.dto.ServiceDTO;
import com.hairsalon.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(ServiceDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ServiceDTO> getActiveServices() {
        return serviceRepository.findByIsActiveTrue().stream()
                .map(ServiceDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ServiceDTO getServiceById(Long id) {
        return ServiceDTO.fromEntity(
            serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"))
        );
    }
}
