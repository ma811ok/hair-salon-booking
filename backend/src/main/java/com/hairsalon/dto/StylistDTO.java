package com.hairsalon.dto;

import com.hairsalon.model.Stylist;
import java.math.BigDecimal;

public class StylistDTO {
    private Long id;
    private String name;
    private String specialty;
    private String avatar;
    private BigDecimal rating;
    private Integer reviews;
    private Integer yearsExperience;
    private Boolean isActive;

    public StylistDTO() {}
    public StylistDTO(Long id, String name, String specialty, String avatar, BigDecimal rating, Integer reviews, Integer yearsExperience, Boolean isActive) {
        this.id = id; this.name = name; this.specialty = specialty; this.avatar = avatar;
        this.rating = rating; this.reviews = reviews; this.yearsExperience = yearsExperience; this.isActive = isActive;
    }

    public static StylistDTO fromEntity(Stylist stylist) {
        return new StylistDTO(
            stylist.getId(), stylist.getName(), stylist.getSpecialty(), stylist.getAvatar(),
            stylist.getRating(), stylist.getReviews(), stylist.getYearsExperience(), stylist.getIsActive()
        );
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }
    public Integer getYearsExperience() { return yearsExperience; }
    public void setYearsExperience(Integer yearsExperience) { this.yearsExperience = yearsExperience; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
