package com.hairsalon.service;

import com.hairsalon.dto.BookingDTO;
import com.hairsalon.dto.BookingRequest;
import com.hairsalon.model.Booking;
import com.hairsalon.model.HairService;
import com.hairsalon.model.Stylist;
import com.hairsalon.model.User;
import com.hairsalon.repository.BookingRepository;
import com.hairsalon.repository.ServiceRepository;
import com.hairsalon.repository.StylistRepository;
import com.hairsalon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final StylistRepository stylistRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, UserRepository userRepository,
                          ServiceRepository serviceRepository, StylistRepository stylistRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
        this.stylistRepository = stylistRepository;
    }

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(BookingDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<BookingDTO> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(BookingDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public BookingDTO getBookingById(Long id) {
        return BookingDTO.fromEntity(
            bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"))
        );
    }

    @Transactional
    public BookingDTO createBooking(BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        HairService service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));
        Stylist stylist = stylistRepository.findById(request.getStylistId())
                .orElseThrow(() -> new RuntimeException("Stylist not found"));

        LocalDateTime dateTime = LocalDateTime.parse(request.getDateTime(), DateTimeFormatter.ISO_DATE_TIME);

        List<Booking> conflicts = bookingRepository.findConflictingBookings(stylist.getId(), dateTime);
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("This time slot is already booked");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setService(service);
        booking.setStylist(stylist);
        booking.setDateTime(dateTime);
        booking.setNotes(request.getNotes());
        booking.setStatus(Booking.BookingStatus.PENDING);

        booking = bookingRepository.save(booking);
        return BookingDTO.fromEntity(booking);
    }

    @Transactional
    public BookingDTO updateBooking(Long id, BookingRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (request.getServiceId() != null) {
            HairService service = serviceRepository.findById(request.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
            booking.setService(service);
        }

        if (request.getStylistId() != null) {
            Stylist stylist = stylistRepository.findById(request.getStylistId())
                    .orElseThrow(() -> new RuntimeException("Stylist not found"));
            booking.setStylist(stylist);
        }

        if (request.getDateTime() != null) {
            LocalDateTime dateTime = LocalDateTime.parse(request.getDateTime(), DateTimeFormatter.ISO_DATE_TIME);
            booking.setDateTime(dateTime);
        }

        if (request.getNotes() != null) {
            booking.setNotes(request.getNotes());
        }

        booking = bookingRepository.save(booking);
        return BookingDTO.fromEntity(booking);
    }

    @Transactional
    public BookingDTO cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking = bookingRepository.save(booking);
        return BookingDTO.fromEntity(booking);
    }

    @Transactional
    public BookingDTO confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        booking = bookingRepository.save(booking);
        return BookingDTO.fromEntity(booking);
    }
}
