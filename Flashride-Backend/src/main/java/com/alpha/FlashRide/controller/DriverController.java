package com.alpha.FlashRide.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.alpha.FlashRide.ResponseStructure;
import com.alpha.FlashRide.DTO.CancelBookingResponseDTO;
import com.alpha.FlashRide.DTO.RegisterDriverVehicleDTO;
import com.alpha.FlashRide.DTO.RideCompletionDTO;
import com.alpha.FlashRide.DTO.VehicleDetailsDTO;
import com.alpha.FlashRide.Service.DriverService;
import com.alpha.FlashRide.entity.Driver;
import com.alpha.FlashRide.entity.Vehicle;

@RestController
@RequestMapping("/driver")
@CrossOrigin(origins = "http://localhost:5173")
public class DriverController {

	@Autowired
	private DriverService ds;

	// 🔐 helper: mobile number from JWT
	private long getMobileFromToken() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return Long.parseLong(auth.getName());
	}

	@PostMapping("/savedriver")
	public ResponseEntity<ResponseStructure<Driver>> saveRegisterDriverVehicleDTO(
			@RequestBody RegisterDriverVehicleDTO driverDTO) {

		return ds.saveDriverDTO(driverDTO);
	}

	// ✅ CHANGED: mobile number from token
	@GetMapping("/finddriver")
	public ResponseEntity<ResponseStructure<Driver>> getLoggedInDriver() {

		long mobileNo = getMobileFromToken();
		return ds.findDriverByMobile(mobileNo);
	}

	// ✅ CHANGED: removed mobileNo from path, taken from token
	@DeleteMapping("/deletedriver")
	public ResponseEntity<ResponseStructure<String>> deleteDriver() {

		long mobileNo = getMobileFromToken();
		return ds.deleteDriver(mobileNo);
	}

	// ✅ CHANGED: removed mobileNo param, taken from token
	@PutMapping("/updatedrivervehicleloc")
	public ResponseEntity<ResponseStructure<String>> updateLocation(@RequestParam String latitude,
			@RequestParam String longitude) {

		long mobileNo = getMobileFromToken();
		return ds.updateDriverLocation(mobileNo, latitude, longitude);
	}

	// ❌ NOT CHANGED (no mobile dependency)
	@PutMapping("/completeride")
	public ResponseEntity<ResponseStructure<RideCompletionDTO>> completeRide(@RequestParam int bookingId,
			@RequestParam String paymentType) {

		return ds.completeRide(bookingId, paymentType);
	}

	// ❌ NOT CHANGED (uses driverId)
	@PostMapping("/cancelbooking")
	public ResponseEntity<CancelBookingResponseDTO> cancelBooking(@RequestParam("driverId") int driverId,
			@RequestParam("bookingId") int bookingId) {

		return ResponseEntity.ok(ds.cancelBookingByDriver(driverId, bookingId));
	}
	
	
	//MYCode
	
	@GetMapping("/findallvehicle")
	public ResponseEntity<?> findAllVehicles() {
	    try {
	        // 1. Changed 'driverService' to 'ds' to match your @Autowired variable
	        List<VehicleDetailsDTO> vehicles = ds.getAllAvailableVehicles(); 
	        
	        // 2. Changed 'ResponseDTO' to 'ResponseStructure' to match your project pattern
	        ResponseStructure<List<VehicleDetailsDTO>> structure = new ResponseStructure<>();
	        structure.setStatuscode(200);
	        structure.setMessage("Vehicles found successfully");
	        structure.setData(vehicles);
	        
	        return ResponseEntity.ok(structure);
	    } catch (Exception e) {
	        // Log the error so you can see it in the console
	        e.printStackTrace(); 
	        return ResponseEntity.status(500).body("Error: " + e.getMessage());
	    }
	}
}
