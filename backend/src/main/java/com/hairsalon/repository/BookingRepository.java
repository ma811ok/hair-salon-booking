package com.hairsalon.repository;

import com.hairsalon.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByStylistId(Long stylistId);
    
    @Query("SELECT b FROM Booking b WHERE b.stylist.id = ?1 AND b.dateTime = ?2 AND b.status != 'CANCELLED'")
    List<Booking> findConflictingBookings(Long stylistId, LocalDateTime dateTime);
    
    List<Booking> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
}
