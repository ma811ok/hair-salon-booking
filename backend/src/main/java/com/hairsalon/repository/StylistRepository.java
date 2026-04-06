package com.hairsalon.repository;

import com.hairsalon.model.Stylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StylistRepository extends JpaRepository<Stylist, Long> {
    List<Stylist> findByIsActiveTrue();
}
