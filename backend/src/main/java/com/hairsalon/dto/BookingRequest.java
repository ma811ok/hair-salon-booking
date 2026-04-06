package com.hairsalon.dto;

import jakarta.validation.constraints.NotNull;

public class BookingRequest {
    @NotNull(message = "Service ID is required")
    private Long serviceId;

    @NotNull(message = "Stylist ID is required")
    private Long stylistId;

    @NotNull(message = "Date and time is required")
    private String dateTime;

    private Long userId;
    private String notes;

    public BookingRequest() {}
    public BookingRequest(Long serviceId, Long stylistId, String dateTime, Long userId, String notes) {
        this.serviceId = serviceId; this.stylistId = stylistId; this.dateTime = dateTime; this.userId = userId; this.notes = notes;
    }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
    public Long getStylistId() { return stylistId; }
    public void setStylistId(Long stylistId) { this.stylistId = stylistId; }
    public String getDateTime() { return dateTime; }
    public void setDateTime(String dateTime) { this.dateTime = dateTime; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
