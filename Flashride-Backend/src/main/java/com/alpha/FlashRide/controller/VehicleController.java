//package com.alpha.FlashRide.controller;
//
//import com.alpha.FlashRide.ResponseStructure;
//import com.alpha.FlashRide.entity.Vehicle;
//import com.alpha.FlashRide.Service.DriverService;
//import com.alpha.FlashRide.security.JwtUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/vehicle") // Final URL: /api/vehicle/add
//public class VehicleController {
//
//    @Autowired
//    private DriverService driverService;
//
//    // Helper to get mobile from JWT
//    private long getMobileFromToken() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        return Long.parseLong(auth.getName());
//    }
//
//    @PutMapping("/add")
//    public ResponseEntity<ResponseStructure<String>> addOrUpdateVehicle(@RequestBody Vehicle vehicle) {
//        long mobileNo = getMobileFromToken();
//        // Calling the update logic in your DriverService
//        return driverService.updateVehicleDetails(mobileNo, vehicle);
//    }
//}

//Change me

package com.alpha.FlashRide.controller;

import com.alpha.FlashRide.ResponseStructure;
import com.alpha.FlashRide.entity.Vehicle;
import com.alpha.FlashRide.Service.DriverService;
import com.alpha.FlashRide.DTO.VehicleDetailsDTO; // Import your DTO
import com.alpha.FlashRide.Repository.VehicleRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    private DriverService driverService;
    
    @Autowired
    private VehicleRepository vehicleRepository;

    // Helper to get mobile from JWT
    private long getMobileFromToken() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return Long.parseLong(auth.getName());
    }

    // 1. Existing Update Logic
    @PutMapping("/add")
    public ResponseEntity<ResponseStructure<String>> addOrUpdateVehicle(@RequestBody Vehicle vehicle) {
        long mobileNo = getMobileFromToken();
        return driverService.updateVehicleDetails(mobileNo, vehicle);
    }

    // 2. NEW: Fetch Details Logic using VehicleDetailsDTO
    @GetMapping("/details")
    public ResponseEntity<ResponseStructure<VehicleDetailsDTO>> getVehicleDetails() {
        long mobileNo = getMobileFromToken();
        // This calls the method you added to DriverService
        return driverService.getVehicleDetails(mobileNo);
    }
    
//    @GetMapping("/all")
//    public ResponseEntity<ResponseStructure<List<Vehicle>>> getAllVehicles() {
//        return driverService.findAllVehicles();
//    }
    
 // ADD THIS METHOD
    @GetMapping("/available")
    public ResponseEntity<ResponseStructure<List<Vehicle>>> getAvailableVehicles() {
        // This calls the service to get all vehicles
        // Note: For a real app, you'd filter by 'Available' status in the service
        return driverService.findAllVehicles(); 
    }
    
    @GetMapping("/all")
    public ResponseEntity<ResponseStructure<List<Vehicle>>> getAllVehicles() {
        return driverService.findAllVehicles();
    }
    
    
    @PostMapping("/add")
    public ResponseEntity<ResponseStructure<Vehicle>> addVehicle(@RequestBody Vehicle vehicle) {
        // Requirement: Ensure vehicle is immediately available for allocation
        if (vehicle.getAvailableStatus() == null) {
            vehicle.setAvailableStatus("AVAILABLE");
        }
        
        try {
            Vehicle saved = vehicleRepository.save(vehicle);
            
            ResponseStructure<Vehicle> structure = new ResponseStructure<>();
            structure.setStatuscode(201);
            structure.setMessage("Vehicle Registered Successfully");
            structure.setData(saved);
            
            return new ResponseEntity<>(structure, HttpStatus.CREATED);
        } catch (Exception e) {
            // This catches DB constraints (e.g., duplicate Vehicle Number)
            throw new RuntimeException("Save failed: " + e.getMessage());
        }
    }
}