package com.hairsalon.repository;

import com.hairsalon.model.HairService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<HairService, Long> {
    List<HairService> findByIsActiveTrue();
}
