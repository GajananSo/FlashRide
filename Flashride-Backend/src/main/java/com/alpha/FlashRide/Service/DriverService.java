package com.alpha.FlashRide.Service;

import java.util.stream.Collectors;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.alpha.FlashRide.ResponseStructure;
import com.alpha.FlashRide.DTO.CancelBookingResponseDTO;
import com.alpha.FlashRide.DTO.RegisterDriverVehicleDTO;
import com.alpha.FlashRide.DTO.RideCompletionDTO;
import com.alpha.FlashRide.DTO.UpiDTO;
import com.alpha.FlashRide.DTO.VehicleDetailsDTO;
import com.alpha.FlashRide.Repository.BookingRepository;
import com.alpha.FlashRide.Repository.CustomerRepository;
import com.alpha.FlashRide.Repository.DriverRepository;
import com.alpha.FlashRide.Repository.PaymentRepository;
import com.alpha.FlashRide.Repository.UserrRepo;
import com.alpha.FlashRide.Repository.VehicleRepository;
import com.alpha.FlashRide.entity.Booking;
import com.alpha.FlashRide.entity.Customer;
import com.alpha.FlashRide.entity.Driver;
import com.alpha.FlashRide.entity.Payment;
import com.alpha.FlashRide.entity.Userr;
import com.alpha.FlashRide.entity.Vehicle;
import com.alpha.FlashRide.exception.DriverNotFoundException;

@Service
public class DriverService {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private DriverRepository dr;

	@Autowired
	private VehicleRepository vr;

	@Autowired
	private CustomerRepository cr;

	@Autowired
	private BookingRepository br;
	@Autowired
	private PaymentRepository pr;
	

	@Autowired
	private UserrRepo userrRepo;

	@Value("${locationiq.api.key}")
	private String apiKey;

	public String getCityName(String string, String string2) {

		String url = "https://us1.locationiq.com/v1/reverse?key=" + apiKey + "&lat=" + string + "&lon=" + string2
				+ "&format=json";

		RestTemplate restTemplate = new RestTemplate();
		Map<String, Object> response = restTemplate.getForObject(url, Map.class);

		Map<String, Object> address = (Map<String, Object>) response.get("address");

		if (address.get("city") != null)
			return address.get("city").toString();
		else if (address.get("town") != null)
			return address.get("town").toString();
		else if (address.get("village") != null)
			return address.get("village").toString();
		else
			return "Unknown";
	}

	// ==========save driver along with vehicle========

	public ResponseEntity<ResponseStructure<Driver>> saveDriverDTO(RegisterDriverVehicleDTO dto) {

		Driver d = new Driver();
		d.setLicenseNo(dto.getLicenseNo());
		d.setUpiid(dto.getUpiID());
		d.setName(dto.getDriverName());
		d.setAge(dto.getAge());
		d.setMobileno(dto.getMobileNo());
		d.setGender(dto.getGender());
		d.setMailid(dto.getMailId());

		String city = getCityName(dto.getLatitude(), dto.getLongitude());

		Vehicle v = new Vehicle();
		v.setName(dto.getVehicleName());
		v.setVehicleNo(dto.getVehicleNo());
		v.setType(dto.getVehicleType());
		v.setModel(dto.getModel());
		v.setCapacity(dto.getVehicleCapacity());
		v.setCurrentCity(city);
		v.setPricePerKM(dto.getPricePerKM());
		v.setAvgSpeed(dto.getAverageSpeed());
		v.setDriver(d);
		d.setVehicles(v);
		
		Userr user = new Userr();
		user.setMobno(dto.getMobileNo());
		user.setPassword(dto.getPassword());
		user.setRole("DRIVER");
		
		userrRepo.save(user);
		Driver savedDriver = dr.save(d);

		ResponseStructure<Driver> rs = new ResponseStructure<>();
		rs.setStatuscode(200);
		rs.setMessage("Driver saved successfully");
		rs.setData(savedDriver);

		return ResponseEntity.ok(rs);
	}

	// ================ FIND DRIVER=======================

	public ResponseEntity<ResponseStructure<Driver>> findDriverByMobile(long mobileNo) {

		Driver driver = dr.findByMobileno(mobileNo)
				.orElseThrow(() -> new DriverNotFoundException("Driver not found with mobile: " + mobileNo));

		ResponseStructure<Driver> rs = new ResponseStructure<>();
		rs.setStatuscode(200);
		rs.setMessage("Driver found successfully");
		rs.setData(driver);

		return ResponseEntity.ok(rs);
	}

	// ============ DELETE DRIVER =========================

	public ResponseEntity<ResponseStructure<String>> deleteDriver(long mobileNo) {

		ResponseStructure<String> rs = new ResponseStructure<>();

		Driver driver = dr.findByMobileno(mobileNo).orElse(null);

		if (driver != null) {
			dr.delete(driver);

			rs.setStatuscode(200);
			rs.setMessage("Driver deleted successfully");
			rs.setData("Deleted");

			return ResponseEntity.ok(rs);
		}

		rs.setStatuscode(404);
		rs.setMessage("Driver not found");
		rs.setData("Not Found");

		return ResponseEntity.status(404).body(rs);
	}

	// ===============UPDATE DRIVER LOCATION===============
	public ResponseEntity<ResponseStructure<String>> updateDriverLocation(long mobileNo, String latitude,
			String longitude) {

		Driver driver = dr.findByMobileno(mobileNo)
				.orElseThrow(() -> new DriverNotFoundException("Driver not found with mobile: " + mobileNo));

		String city = getCityName(latitude, longitude);

		if (driver.getVehicles() != null) {
			Vehicle v = (Vehicle) driver.getVehicles();
			v.setCurrentCity(city);

			vr.save(v);
		}

		ResponseStructure<String> rs = new ResponseStructure<>();
		rs.setStatuscode(200);
		rs.setMessage("Driver location updated successfully");
		rs.setData("Updated to: " + city);

		return ResponseEntity.ok(rs);
	}

//===========================CompletionRide==============================

	public ResponseEntity<ResponseStructure<RideCompletionDTO>> completeRide(int bookingId, String paymentType) {

		if (paymentType.equalsIgnoreCase("CASH")) {
			return cashPayment(bookingId);
		} else if (paymentType.equalsIgnoreCase("UPI")) {
			return upiPayment(bookingId);
		} else {
			throw new RuntimeException("Invalid payment type");
		}
	}

	// ===========CASH PAYMENT========================

	private ResponseEntity<ResponseStructure<RideCompletionDTO>> cashPayment(int bookingId) {

		RideCompletionDTO dto = completeRideCommonLogic(bookingId, "CASH");

		ResponseStructure<RideCompletionDTO> rs = new ResponseStructure<>();
		rs.setStatuscode(200);
		rs.setMessage("Cash payment successful");
		rs.setData(dto);

		return ResponseEntity.ok(rs);
	}

	// ========UPI PAYMENT=============

	private ResponseEntity<ResponseStructure<RideCompletionDTO>> upiPayment(int bookingId) {

		// COMMON RIDE COMPLETION FIRST
		RideCompletionDTO dto = completeRideCommonLogic(bookingId, "UPI");

		Booking booking = dto.getBooking();

		// GENERATE UPI QR
		String upiId = booking.getVehicle().getDriver().getUpiid();

		String qrUrl = "https://api.qrserver.com/v1/create-qr-code/" + "?size=300x300&data=upi://pay?pa=" + upiId;

		byte[] qrBytes = restTemplate.getForObject(qrUrl, byte[].class);

		// CREATE UPI DTO
		UpiDTO upiDTO = new UpiDTO();
		upiDTO.setFare(booking.getFare());
		upiDTO.setQr(qrBytes);

		dto.setUpiDetails(upiDTO);

		ResponseStructure<RideCompletionDTO> rs = new ResponseStructure<>();
		rs.setStatuscode(200);
		rs.setMessage("UPI payment successful");
		rs.setData(dto);

		return ResponseEntity.ok(rs);
	}

	// COMMON RIDE COMPLETION LOGIC

	private RideCompletionDTO completeRideCommonLogic(int bookingId, String paymentType) {

		Booking booking = br.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));

		booking.setBookingStatus("COMPLETED");
		booking.setPaymentStatus("PAID");

		Customer customer = booking.getCustomer();
		customer.setBookingflag(false);

		Vehicle vehicle = booking.getVehicle();
		//vehicle.setAvailableStatus("AVAILABLE");
		vehicle.setAvailableStatus("Available");

		int penaltyCount = customer.getPenaltyCount();
		int fare = booking.getFare();
		int penaltyPercentage = penaltyCount * 10;
		int penaltyAmount = (fare * penaltyPercentage) / 100;

		Payment payment = new Payment();
		payment.setBooking(booking);
		payment.setCustomer(customer);
		payment.setVehicle(vehicle);
		payment.setAmount(booking.getFare());
		payment.setPaymenttype(paymentType);

		br.save(booking);
		cr.save(customer);
		vr.save(vehicle);
		pr.save(payment);

		RideCompletionDTO dto = new RideCompletionDTO();
		dto.setBooking(booking);
		dto.setCustomer(customer);
		dto.setVehicle(vehicle);
		dto.setPayment(payment);

		return dto;
	}

//--------------------------------------------------------------------
	public CancelBookingResponseDTO cancelBookingByDriver(int driverId, int bookingId) {

		// Counter to track how many bookings the driver cancelled today
		int count = 0;

		// Get today's date (used to check today's cancellations only)
		Date todayDate = new Date(System.currentTimeMillis());

		// Fetch all bookings of this driver for today's date
		// Uses Booking → Vehicle → Driver relationship internally (JPQL join)
		List<Booking> bookingList = br.findByDriverIdAndBookingDate(driverId, todayDate);

		// Fetch the specific booking which the driver wants to cancel
		Booking book = br.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));

		// Iterate over today's bookings of the driver
		// Count how many bookings are already cancelled by the driver
		for (Booking b : bookingList) {
			if ("cancelledByDriver".equalsIgnoreCase(b.getBookingStatus())) {
				count++;
			}
		}

		// Fetch driver details using driverId
		Driver driver = dr.findById(driverId).orElseThrow(() -> new RuntimeException("Driver not found"));

		// Business rule:
		// If driver cancels 4 or more bookings in a single day,
		// block the driver from further bookings
		if (count >= 4) {
			driver.setStatus("BLOCKED");
		}

		// Update the current booking status as cancelled by driver
		book.setBookingStatus("cancelledByDriver");

		// Save updated driver status in database
		dr.save(driver);

		// Save updated booking status in database
		br.save(book);

		// Return response DTO to controller
		return new CancelBookingResponseDTO("Booking cancelled successfully", driver.getStatus(),
				book.getBookingStatus());
	}
	
	//Added  By Gaju
	
	
//	public ResponseEntity<ResponseStructure<String>> updateVehicleDetails(long mobileNo, Vehicle newData) {
//	    // 1. Find the driver using the mobile number from the JWT token
//	    Driver driver = dr.findByMobileno(mobileNo)
//	            .orElseThrow(() -> new DriverNotFoundException("Driver not found with mobile: " + mobileNo));
//
//	    // 2. Since Vehicle uses @MapsId, its ID is the same as the Driver's ID.
//	    // We check if a vehicle already exists for this driver ID; if not, create new.
//	    Vehicle vehicle = vr.findById(driver.getId()).orElse(new Vehicle());
//	    
//	    // 3. Sync the data from the frontend to the database Entity
//	    // Force the ID to match the Driver's ID to satisfy @MapsId
//	    vehicle.setId(driver.getId()); 
//	    vehicle.setDriver(driver);
//	    
//	    // Map fields from newData (incoming from React) to our persistent vehicle object
//	    vehicle.setName(newData.getName());
//	    vehicle.setVehicleNo(newData.getVehicleNo());
//	    vehicle.setType(newData.getType());
//	    vehicle.setModel(newData.getModel());
//	    vehicle.setCapacity(newData.getCapacity());
//	    vehicle.setPricePerKM(newData.getPricePerKM());
//	    vehicle.setAvgSpeed(newData.getAvgSpeed());
//	    vehicle.setAvailableStatus("Available");
//
//	    // 4. Save the vehicle
//	    vr.save(vehicle);
//
//	    // 5. Prepare the standardized response
//	    ResponseStructure<String> rs = new ResponseStructure<>();
//	    rs.setStatuscode(200);
//	    rs.setMessage("Vehicle updated successfully");
//	    rs.setData("Saved vehicle: " + vehicle.getName());
//
//	    return ResponseEntity.ok(rs);
//	}
//Gaju So	
	// Add this to the end of your DriverService class
	// Inside DriverService class
//	@Autowired
//	private VehicleRepository vehicleRepository; // Ensure this is autowired
//
//	public ResponseEntity<ResponseStructure<List<Vehicle>>> findAllVehicles() {
//	    List<Vehicle> vehicles = vehicleRepository.findAll();
//	    
//	    ResponseStructure<List<Vehicle>> structure = new ResponseStructure<>();
//	    structure.setStatuscode(200);
//	    structure.setMessage("Vehicles fetched successfully");
//	    structure.setData(vehicles);
//	    
//	    return new ResponseEntity<>(structure, HttpStatus.OK);
//	}
    
	public ResponseEntity<ResponseStructure<VehicleDetailsDTO>> getVehicleDetails(long mobileNo) {
	    // 1. Find the driver
	    Driver driver = dr.findByMobileno(mobileNo)
	            .orElseThrow(() -> new DriverNotFoundException("Driver not found with mobile: " + mobileNo));

	    // 2. Get the associated vehicle
	    Vehicle vehicle = (Vehicle) driver.getVehicles();
	    if (vehicle == null) {
	        throw new RuntimeException("No vehicle registered for this driver yet.");
	    }

	    // 3. Create the DTO 
	    // You can add real logic here later (e.g., calling Google Maps API for time)
	    int mockFare = vehicle.getPricePerKM() * 5; // Example: Base fare for 5km
	    int mockEstimatedTime = 10; // Example: 10 minutes away

	    VehicleDetailsDTO dto = new VehicleDetailsDTO();
	    dto.setV(vehicle);
	    dto.setFare(mockFare);
	    dto.setEstimatedTime(mockEstimatedTime);
	    dto.setAveragespeed(vehicle.getAvgSpeed());

	    // 4. Build Response
	    ResponseStructure<VehicleDetailsDTO> rs = new ResponseStructure<>();
	    rs.setStatuscode(200);
	    rs.setMessage("Detailed vehicle profile fetched successfully");
	    rs.setData(dto);

	    return ResponseEntity.ok(rs);
	}
	
	public ResponseEntity<ResponseStructure<List<Vehicle>>> findAllVehicles() {
	    // Fetch all vehicles from the database
	    List<Vehicle> vehicles = vr.findAll();
	    
	    ResponseStructure<List<Vehicle>> structure = new ResponseStructure<>();
	    structure.setStatuscode(200);
	    structure.setMessage("All vehicles fetched successfully");
	    structure.setData(vehicles);
	    
	    return new ResponseEntity<>(structure, HttpStatus.OK);
	}
	
	public ResponseEntity<ResponseStructure<String>> addVehicleToFleet(long mobileNo, Vehicle newData) {
	    // 1. Find the driver
	    Driver driver = dr.findByMobileno(mobileNo)
	            .orElseThrow(() -> new DriverNotFoundException("Driver not found"));

	    // 2. Create a BRAND NEW instance (This ensures a new row in DB)
	    Vehicle vehicle = new Vehicle(); 
	    
	    // 3. Map the fields
	    vehicle.setDriver(driver); // Link the vehicle to this driver
	    vehicle.setName(newData.getName());
	    vehicle.setVehicleNo(newData.getVehicleNo());
	    vehicle.setType(newData.getType());
	    vehicle.setModel(newData.getModel());
	    vehicle.setCapacity(newData.getCapacity());
	    vehicle.setPricePerKM(newData.getPricePerKM());
	    vehicle.setAvgSpeed(newData.getAvgSpeed());
	    vehicle.setCurrentCity(newData.getCurrentCity());
	    //vehicle.setAvailableStatus("Available");
	    vehicle.setAvailableStatus("Available");

	    // 4. Save (JPA will now use INSERT instead of UPDATE)
	    vr.save(vehicle);

	    ResponseStructure<String> rs = new ResponseStructure<>();
	    rs.setStatuscode(200);
	    rs.setMessage("Vehicle added to fleet successfully");
	    rs.setData(vehicle.getName());

	    return ResponseEntity.ok(rs);
	}
	
	public ResponseEntity<ResponseStructure<String>> updateVehicleDetails(long mobileNo, Vehicle newData) {
	    Driver driver = dr.findByMobileno(mobileNo)
	            .orElseThrow(() -> new DriverNotFoundException("Driver not found"));

	    // We create a new vehicle instance
	    Vehicle v = new Vehicle(); 
	    v.setDriver(driver); 
	    v.setName(newData.getName());
	    v.setVehicleNo(newData.getVehicleNo());
	    v.setType(newData.getType());
	    v.setModel(newData.getModel());
	    v.setCapacity(newData.getCapacity());
	    v.setPricePerKM(newData.getPricePerKM());
	    v.setAvgSpeed(newData.getAvgSpeed());
	   // v.setAvailableStatus("Available");
	    v.setAvailableStatus("Available");

	    vr.save(v); // Use 'v', not 'vehicle' if 'vehicle' isn't defined

	    ResponseStructure<String> rs = new ResponseStructure<>();
	    rs.setStatuscode(200);
	    rs.setMessage("Vehicle added");
	    rs.setData(v.getName());

	    return ResponseEntity.ok(rs);
	}
	
	public List<VehicleDetailsDTO> getAllAvailableVehicles() {
	    // 1. Use 'vr' instead of 'vehicleRepository' to match your @Autowired name
//	    List<Vehicle> vehicles = vr.findAll(); 
		List<Vehicle> vehicles = vr.findAll().stream()
			    .filter(v -> "Available".equalsIgnoreCase(v.getAvailableStatus()))
			    .toList();
	    
	    // 2. Map the Entity list to a DTO list
	    return vehicles.stream().map(v -> {
	        VehicleDetailsDTO dto = new VehicleDetailsDTO();
	        
	        // Ensure these setters match your VehicleDetailsDTO class
	        dto.setVehicleId(v.getId());
	        
	        // Ensure these getters match your Vehicle Entity class
	        // (If your Entity uses getName() or getModel(), change these accordingly)
	        dto.setVehicleModel(v.getModel()); 
	        dto.setVehicleNumber(v.getVehicleNo());
	        dto.setVehicleType(v.getType());
	        
	        // If your Entity doesn't have 'baseFare', use 'pricePerKM' or a mock value
	        dto.setBaseFare(v.getPricePerKM()); 
	        
	        return dto;
	    }).collect(Collectors.toList());
	}
}
