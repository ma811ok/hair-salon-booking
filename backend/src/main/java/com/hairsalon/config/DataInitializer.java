package com.hairsalon.config;

import com.hairsalon.model.*;
import com.hairsalon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final com.hairsalon.repository.ServiceRepository serviceRepository;
    private final StylistRepository stylistRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(UserRepository userRepository, com.hairsalon.repository.ServiceRepository serviceRepository,
                          StylistRepository stylistRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
        this.stylistRepository = stylistRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create Admin User
        if (!userRepository.existsByEmail("admin@snipstyle.com")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@snipstyle.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("+1 234 567 8901");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }

        // Create Demo User
        if (!userRepository.existsByEmail("demo@snipstyle.com")) {
            User demo = new User();
            demo.setName("John Doe");
            demo.setEmail("demo@snipstyle.com");
            demo.setPassword(passwordEncoder.encode("password123"));
            demo.setPhone("+1 234 567 8902");
            demo.setRole(User.Role.CUSTOMER);
            userRepository.save(demo);
        }

        // Create Services
        if (serviceRepository.count() == 0) {
            HairService s1 = new HairService();
            s1.setName("Classic Haircut"); s1.setDescription("Traditional haircut with precision styling");
            s1.setPrice(new BigDecimal("35.00")); s1.setDuration(30); s1.setIsActive(true);
            serviceRepository.save(s1);

            HairService s2 = new HairService();
            s2.setName("Modern Fade"); s2.setDescription("Contemporary fade with custom design");
            s2.setPrice(new BigDecimal("45.00")); s2.setDuration(45); s2.setIsActive(true);
            serviceRepository.save(s2);

            HairService s3 = new HairService();
            s3.setName("Beard Trim & Shape"); s3.setDescription("Professional beard grooming and styling");
            s3.setPrice(new BigDecimal("25.00")); s3.setDuration(20); s3.setIsActive(true);
            serviceRepository.save(s3);

            HairService s4 = new HairService();
            s4.setName("Hair Coloring"); s4.setDescription("Full color treatment with premium products");
            s4.setPrice(new BigDecimal("85.00")); s4.setDuration(90); s4.setIsActive(true);
            serviceRepository.save(s4);

            HairService s5 = new HairService();
            s5.setName("Signature Package"); s5.setDescription("Haircut, beard trim, and styling");
            s5.setPrice(new BigDecimal("55.00")); s5.setDuration(60); s5.setIsActive(true);
            serviceRepository.save(s5);

            HairService s6 = new HairService();
            s6.setName("Kids Haircut"); s6.setDescription("Gentle haircut for children under 12");
            s6.setPrice(new BigDecimal("25.00")); s6.setDuration(25); s6.setIsActive(true);
            serviceRepository.save(s6);
        }

        // Create Stylists
        if (stylistRepository.count() == 0) {
            Stylist st1 = new Stylist();
            st1.setName("Michael Chen"); st1.setSpecialty("Master Stylist");
            st1.setRating(new BigDecimal("4.9")); st1.setReviews(156); st1.setYearsExperience(12); st1.setIsActive(true);
            stylistRepository.save(st1);

            Stylist st2 = new Stylist();
            st2.setName("Sarah Johnson"); st2.setSpecialty("Color Expert");
            st2.setRating(new BigDecimal("4.8")); st2.setReviews(98); st2.setYearsExperience(8); st2.setIsActive(true);
            stylistRepository.save(st2);

            Stylist st3 = new Stylist();
            st3.setName("David Martinez"); st3.setSpecialty("Fade Specialist");
            st3.setRating(new BigDecimal("4.7")); st3.setReviews(134); st3.setYearsExperience(6); st3.setIsActive(true);
            stylistRepository.save(st3);

            Stylist st4 = new Stylist();
            st4.setName("Emma Wilson"); st4.setSpecialty("Modern Styles");
            st4.setRating(new BigDecimal("4.9")); st4.setReviews(87); st4.setYearsExperience(5); st4.setIsActive(true);
            stylistRepository.save(st4);

            Stylist st5 = new Stylist();
            st5.setName("James Brown"); st5.setSpecialty("Classic Cuts");
            st5.setRating(new BigDecimal("4.6")); st5.setReviews(112); st5.setYearsExperience(15); st5.setIsActive(true);
            stylistRepository.save(st5);
        }

        System.out.println("=================================");
        System.out.println("  Snip & Style - Data Initialized!");
        System.out.println("=================================");
        System.out.println("  Admin: admin@snipstyle.com / admin123");
        System.out.println("  Demo:  demo@snipstyle.com / password123");
        System.out.println("=================================");
    }
}
