package com.hairsalon.dto;

import com.hairsalon.model.Booking;
import java.time.LocalDateTime;

public class BookingDTO {
    private Long id;
    private UserDTO user;
    private ServiceDTO service;
    private StylistDTO stylist;
    private LocalDateTime dateTime;
    private String status;
    private String notes;
    private LocalDateTime createdAt;

    public BookingDTO() {}
    public BookingDTO(Long id, UserDTO user, ServiceDTO service, StylistDTO stylist, LocalDateTime dateTime, String status, String notes, LocalDateTime createdAt) {
        this.id = id; this.user = user; this.service = service; this.stylist = stylist;
        this.dateTime = dateTime; this.status = status; this.notes = notes; this.createdAt = createdAt;
    }

    public static BookingDTO fromEntity(Booking booking) {
        return new BookingDTO(
            booking.getId(),
            UserDTO.fromEntity(booking.getUser()),
            ServiceDTO.fromEntity(booking.getService()),
            StylistDTO.fromEntity(booking.getStylist()),
            booking.getDateTime(),
            booking.getStatus().name(),
            booking.getNotes(),
            booking.getCreatedAt()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
    public ServiceDTO getService() { return service; }
    public void setService(ServiceDTO service) { this.service = service; }
    public StylistDTO getStylist() { return stylist; }
    public void setStylist(StylistDTO stylist) { this.stylist = stylist; }
    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
