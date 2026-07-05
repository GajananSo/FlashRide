
package com.alpha.FlashRide.Service; // ✅ CRITICAL: This must be the first line

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alpha.FlashRide.ResponseStructure;
import com.alpha.FlashRide.DTO.BookingDTO;
import com.alpha.FlashRide.Repository.BookingRepository;
import com.alpha.FlashRide.Repository.CustomerRepository;
import com.alpha.FlashRide.Repository.VehicleRepository;
import com.alpha.FlashRide.entity.Booking;
import com.alpha.FlashRide.entity.Customer;
import com.alpha.FlashRide.entity.Driver;
import com.alpha.FlashRide.entity.Vehicle;

@Service
public class BookingService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Transactional
    public ResponseStructure<Booking> bookVehicle(Long customerMobile, BookingDTO dto) {
        // 1. Validate Customer
        Customer customer = customerRepository.findByMobileNo(customerMobile)
                .orElseThrow(() -> new RuntimeException("Customer not found with mobile: " + customerMobile));

        // 2. Validate Vehicle
        if (dto.getVehicleid() == null) {
            throw new RuntimeException("Vehicle ID provided in request is null");
        }
        
        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleid())
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + dto.getVehicleid()));

        // 3. Create & Save Booking FIRST
        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setVehicle(vehicle);
        booking.setSourceLoc(dto.getSourceLoc());
        booking.setDestinationLoc(dto.getDestinationLoc());
        booking.setDistanceTravelled(dto.getDistanceTravelled());
        booking.setFare(dto.getFare());
        booking.setEstimatedTime(dto.getEstimatedTime());
        booking.setBookingStatus("BOOKED");
        
        // Save to ensure the booking HAS an ID before we add it to other lists
        booking = bookingRepository.save(booking);

        // 4. Update Customer (Use existing list or create new)
        List<Booking> customerBookings = customer.getBookinglist();
        if (customerBookings == null) {
            customerBookings = new ArrayList<>();
            customer.setBookinglist(customerBookings);
        }
        customerBookings.add(booking);
        customer.setBookingflag(true);
        customerRepository.save(customer);

        // 5. Update Vehicle & Driver Status
        vehicle.setAvailableStatus("Booked");
        
        Driver driver = vehicle.getDriver();
        // CRITICAL: Check if driver exists AND has a valid ID
        if (driver != null && driver.getId() != null) {
            List<Booking> driverBookings = driver.getBookings();
            if (driverBookings == null) {
                driverBookings = new ArrayList<>();
                driver.setBookings(driverBookings);
            }
            driverBookings.add(booking);
            // We don't necessarily need to save(driver) if cascade is on, 
            // but saving vehicle will handle the relationship.
        }
        
        vehicleRepository.save(vehicle);

        // 6. Response
        ResponseStructure<Booking> rs = new ResponseStructure<>();
        rs.setStatuscode(HttpStatus.OK.value());
        rs.setMessage("Vehicle successfully booked");
        rs.setData(booking);

        return rs;
    }
    

    @Transactional
    public ResponseStructure<Booking> bookVehicle(BookingDTO dto, long mobileNo) {
        // 1. Fetch Customer safely
        Customer customer = customerRepository.findByMobileNo(mobileNo)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // 2. Fetch Vehicle
        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleid())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // 3. Update Vehicle to BUSY (This hides it from available list)
        vehicle.setAvailableStatus("BUSY"); // Requirement: Hide from booking list
        vehicleRepository.save(vehicle);
        // 4. Create Booking with History Fields
        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setVehicle(vehicle);
        booking.setSourceLoc(dto.getSourceLoc());
        booking.setDestinationLoc(dto.getDestinationLoc());
        booking.setFare(dto.getFare());
        booking.setBookingStatus("BOOKED"); // Marks as Active
        booking.setPaymentStatus("NOT PAID"); // Requirement: Needs payment
        
        bookingRepository.save(booking);

        ResponseStructure<Booking> rs = new ResponseStructure<>();
        rs.setStatuscode(201);
        rs.setData(booking);
        return rs;
    }
    
    
    
    public ResponseStructure<Booking> getCurrentBooking(long mobileNo) {
        ResponseStructure<Booking> rs = new ResponseStructure<>();
        try {
            // Use a List to prevent 'NonUniqueResultException'
            List<Booking> bookings = bookingRepository.findActiveByMobile(mobileNo);
            
            if (bookings != null && !bookings.isEmpty()) {
                rs.setStatuscode(200);
                rs.setMessage("Active booking found");
                rs.setData(bookings.get(0)); // Get the latest one
            } else {
                rs.setStatuscode(200); 
                rs.setMessage("No active booking");
                rs.setData(null);
            }
        } catch (Exception e) {
            // This will print the EXACT error in your Spring Boot console
            e.printStackTrace(); 
            rs.setStatuscode(500);
            rs.setMessage("Query Failure: " + e.getMessage());
            rs.setData(null);
        }
        return rs;
    }
    
    
    
    
    @Transactional
    public void completeRide(int bookingId) {
        Booking booking = bookingRepository.findById(bookingId).get();
        booking.setBookingStatus("COMPLETED"); // This moves it out of 'Active'
        
        if (booking.getVehicle() != null) {
            // Match the string your frontend filter is looking for
            booking.getVehicle().setAvailableStatus("AVAILABLE"); 
            vehicleRepository.save(booking.getVehicle());
        }
        
        // Make the vehicle available again for others
        Vehicle v = booking.getVehicle();
        v.setAvailableStatus("AVAILABLE");
        
        bookingRepository.save(booking);
        vehicleRepository.save(v);
    }
    

    @Transactional
    public ResponseStructure<String> completePayment(int bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Move to history
        booking.setBookingStatus("COMPLETED");
        booking.setPaymentStatus("PAID");

        // RELEASE THE VEHICLE (Requirement)
        if (booking.getVehicle() != null) {
            booking.getVehicle().setAvailableStatus("AVAILABLE");
            // No need to save vehicle explicitly if using @Transactional, 
            // but it's safe to keep: vehicleRepo.save(booking.getVehicle());
        }

        bookingRepository.save(booking);
        return new ResponseStructure<>(200, "Payment Success", "PAID");
    }
    
    
    public List<Booking> getBookingHistory(long mobileNo) {
        return bookingRepository.findByCustomerMobileNo(mobileNo);
    }
    
    
}