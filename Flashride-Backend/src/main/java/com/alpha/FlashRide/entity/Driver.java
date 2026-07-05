

package com.alpha.FlashRide.entity;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Driver {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private long licenseNo;
	private String upiid;
	private String name;
	private String status = "Available";
	private Integer age;
	private long mobileno;
	private String gender;
	private String mailid;

	@OneToOne
	private Userr userr;

	// 1. Corrected: One Driver can have Many Vehicles
	@OneToMany(mappedBy = "driver", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Vehicle> vehicles = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Booking> bookings = new ArrayList<>();

	// 2. Fixed Constructor: Removed single vehicle, added vehicles list
	public Driver(int id, long licenseNo, String upiid, String name, String status, Integer age, long mobileno,
			String gender, String mailid, Userr userr, List<Vehicle> vehicles, List<Booking> bookings) {
		super();
		this.id = id;
		this.licenseNo = licenseNo;
		this.upiid = upiid;
		this.name = name;
		this.status = status;
		this.age = age;
		this.mobileno = mobileno;
		this.gender = gender;
		this.mailid = mailid;
		this.userr = userr;
		this.vehicles = vehicles;
		this.bookings = bookings;
	}

	public Driver() {}

	// --- Standard Getters and Setters ---

	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }

	public Long getLicenseNo() { return licenseNo; }
	public void setLicenseNo(Long licenseNo) { this.licenseNo = licenseNo; }

	public String getUpiid() { return upiid; }
	public void setUpiid(String upiid) { this.upiid = upiid; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	public Integer getAge() { return age; }
	public void setAge(Integer age) { this.age = age; }

	public Long getMobileno() { return mobileno; }
	public void setMobileno(Long mobileno) { this.mobileno = mobileno; }

	public String getGender() { return gender; }
	public void setGender(String gender) { this.gender = gender; }

	public String getMailid() { return mailid; }
	public void setMailid(String mailid) { this.mailid = mailid; }

	public Userr getUserr() { return userr; }
	public void setUserr(Userr userr) { this.userr = userr; }

	// 3. FIXED: These now handle the LIST of vehicles
	public List<Vehicle> getVehicles() {
		return vehicles;
	}

	public void setVehicles(Vehicle v) {
		this.vehicles = (List<Vehicle>) v;
	}

	public List<Booking> getBookings() { return bookings; }
	public void setBookings(List<Booking> bookings) { this.bookings = bookings; }

	// 4. Fixed ToString: Removed single vehicle reference
	@Override
	public String toString() {
		return "Driver [id=" + id + ", name=" + name + ", mobileno=" + mobileno + ", vehiclesCount=" + (vehicles != null ? vehicles.size() : 0) + "]";
	}	
}
