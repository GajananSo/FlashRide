//package com.alpha.FlashRide.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import com.alpha.FlashRide.ResponseStructure;
//import com.alpha.FlashRide.DTO.BookingDTO;
//import com.alpha.FlashRide.Service.BookingService;
//import com.alpha.FlashRide.entity.Booking;
//
//@RestController
//
//public class BookingController {
//	@Autowired
//	private BookingService bookingservice;
//	
//
//	@PostMapping("/bookVehicle")
//	public ResponseEntity<ResponseStructure<Booking>> bookVehicle(@RequestParam Long mobileNo, @RequestBody BookingDTO bookingdto) {
//		
//		ResponseStructure<Booking> response = bookingservice.bookVehicle(mobileNo, bookingdto);
//	    return ResponseEntity.ok(response);
//	}
//	
//	@GetMapping("/history")
//    public ResponseEntity<ResponseStructure<List<Booking>>> getHistory(@RequestParam long mobileNo) {
//        return new ResponseEntity<>(customerService.getCustomerHistory(mobileNo), HttpStatus.OK);
//    }
//	
//	
//}
package com.alpha.FlashRide.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.alpha.FlashRide.ResponseStructure;
import com.alpha.FlashRide.DTO.BookingDTO;
import com.alpha.FlashRide.DTO.CustomerActiveBookingDTO;
import com.alpha.FlashRide.Service.BookingService;
import com.alpha.FlashRide.Service.CustomerService; // Added this
import com.alpha.FlashRide.entity.Booking;

@RestController
@RequestMapping("/booking") // Added base mapping to match your React URLs
@CrossOrigin(origins = "http://localhost:5173") // Ensure React can connect
public class BookingController {

    @Autowired
    private BookingService bookingservice;

    @Autowired
    private CustomerService customerService; // Injected missing service

    @PostMapping("/bookVehicle")
    public ResponseEntity<ResponseStructure<Booking>> bookVehicle(@RequestParam Long mobileNo, @RequestBody BookingDTO bookingdto) {
        ResponseStructure<Booking> response = bookingservice.bookVehicle(mobileNo, bookingdto);
        return ResponseEntity.ok(response);
    }
    
 // 1. THIS FIXES THE "No static resource booking/active" ERROR
    @GetMapping("/active")
    public ResponseEntity<ResponseStructure<CustomerActiveBookingDTO>> getActiveBooking(@RequestParam long mobileNo) {
        // This maps the GET request to your service logic
        return customerService.CustomerSeeActiveBooking(mobileNo);
    }
    
    
    @GetMapping("/history")
    public ResponseEntity<ResponseStructure<List<Booking>>> getHistory(@RequestParam long mobileNo) {
        // This will now use the method we created in CustomerService
        return new ResponseEntity<>(customerService.getCustomerHistory(mobileNo), HttpStatus.OK);
    }
    
    @PostMapping("/pay")
    public ResponseEntity<ResponseStructure<String>> payBill(@RequestParam int bookingId) {
        // This connects the 'Pay Bill' button to the database logic
        return new ResponseEntity<>(bookingservice.completePayment(bookingId), HttpStatus.OK);
    }
    
}