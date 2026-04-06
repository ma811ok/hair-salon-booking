package com.hairsalon.dto;

import com.hairsalon.model.HairService;
import java.math.BigDecimal;

public class ServiceDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer duration;
    private Boolean isActive;

    public ServiceDTO() {}
    public ServiceDTO(Long id, String name, String description, BigDecimal price, Integer duration, Boolean isActive) {
        this.id = id; this.name = name; this.description = description; this.price = price; this.duration = duration; this.isActive = isActive;
    }

    public static ServiceDTO fromEntity(HairService service) {
        return new ServiceDTO(
            service.getId(), service.getName(), service.getDescription(),
            service.getPrice(), service.getDuration(), service.getIsActive()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
