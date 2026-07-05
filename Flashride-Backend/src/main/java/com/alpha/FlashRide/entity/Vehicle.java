//package com.alpha.FlashRide.entity;
//
//	import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import jakarta.persistence.Entity;
//
//	import jakarta.persistence.Id;
//	import jakarta.persistence.JoinColumn;
//	import jakarta.persistence.MapsId;
//	import jakarta.persistence.OneToOne;
//
//	@Entity
//
//	public class Vehicle {
//
//		@Id
//		private int id;
//		private String name;
//		private String vehicleNo;
//		private String type;
//		private String model;
//		private int capacity;
//		private String currentCity;
//		private String availableStatus="Available";
//		private int pricePerKM;
//		private double avgSpeed;
//		
//		@OneToOne
//		@MapsId
//		@JoinColumn(name = "id") 
//		//@JsonIgnore // Gaju So
//		private Driver driver;
//
//		
//		public int getId() {
//			return id;
//		}
//
//		public void setId(int id) {
//			this.id = id;
//		}
//
//
//		public String getName() {
//			return name;
//		}
//		
//		public void setName(String name) {
//			this.name = name;
//		}
//
//		public String getVehicleNo() {
//			return vehicleNo;
//		}
//
//		public void setVehicleNo(String vehicleNo) {
//			this.vehicleNo = vehicleNo;
//		}
//
//		public String getType() {
//			return type;
//		}
//		public void setType(String type) {
//			this.type = type;
//		}
//
//		public String getModel() {
//			return model;
//		}
//		public void setModel(String model) {
//			this.model = model;
//		}
//		public int getCapacity() {
//			return capacity;
//		}
//		public void setCapacity(int capacity) {
//			this.capacity = capacity;
//		}
//		public String getCurrentCity() {
//			return currentCity;
//		}
//		public void setCurrentCity(String currentCity) {
//			this.currentCity = currentCity;
//		}
//		public String getAvailableStatus() {
//			return availableStatus;
//		}
//		public void setAvailableStatus(String availableStatus) {
//			this.availableStatus = availableStatus;
//		}
//		public int getPricePerKM() {
//			return pricePerKM;
//		}
//		public void setPricePerKM(int pricePerKM) {
//			this.pricePerKM = pricePerKM;
//		}
//		public double getAvgSpeed() {
//			return avgSpeed;
//		}
//		public void setAvgSpeed(double avgSpeed2) {
//			this.avgSpeed = avgSpeed2;
//		}
//
//
//
//
//		public Driver getDriver() {
//			return driver;
//		}
//
//
//
//
//		public void setDriver(Driver driver) {
//			this.driver = driver;
//		}
//
//		public Vehicle(String name, String vehicleNo, String type, String model, Integer capacity, String currentCity,
//				String availableStatus, int pricePerKM, double avgSpeed, Driver driver) {
//			super();
//			this.name = name;
//			this.vehicleNo = vehicleNo;
//			this.type = type;
//			this.model = model;
//			this.capacity = capacity;
//			this.currentCity = currentCity;
//			this.availableStatus = availableStatus;
//			this.pricePerKM = pricePerKM;
//			this.avgSpeed = avgSpeed;
//			this.driver = driver;
//		}
//
//		public Vehicle() {
//			super();
//		}
//
//		@Override
//		public String toString() {
//			return "Vehicle [id=" + id + ", name=" + name + ", vehicleNo=" + vehicleNo + ", type=" + type + ", model="
//					+ model + ", capacity=" + capacity + ", currentCity=" + currentCity + ", availableStatus="
//					+ availableStatus + ", pricePerKM=" + pricePerKM + ", avgSpeed=" + avgSpeed + ", driver=" + driver
//					+ "]";
//		}
//		
//		
//		
//	}


package com.alpha.FlashRide.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 1. Important: Allows multiple vehicles with unique IDs
    private int id;
    
    private String name;
    private String vehicleNo;
    private String type;
    private String model;
    private int capacity;
    private String currentCity;
    private String availableStatus = "Available";
    private int pricePerKM;
    private double avgSpeed;
    
    @ManyToOne // 2. Important: Changes relationship to Many Vehicles for One Driver
    @JoinColumn(name = "driver_id") // 3. Creates a foreign key column in the Vehicle table
    @JsonIgnore // Prevents infinite recursion during JSON conversion
    private Driver driver;

    // --- GETTERS AND SETTERS ---

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getCurrentCity() {
        return currentCity;
    }

    public void setCurrentCity(String currentCity) {
        this.currentCity = currentCity;
    }

    public String getAvailableStatus() {
        return availableStatus;
    }

    public void setAvailableStatus(String availableStatus) {
        this.availableStatus = availableStatus;
    }

    public int getPricePerKM() {
        return pricePerKM;
    }

    public void setPricePerKM(int pricePerKM) {
        this.pricePerKM = pricePerKM;
    }

    public double getAvgSpeed() {
        return avgSpeed;
    }

    public void setAvgSpeed(double avgSpeed) {
        this.avgSpeed = avgSpeed;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    // --- CONSTRUCTORS ---

    public Vehicle() {
        super();
    }

    public Vehicle(String name, String vehicleNo, String type, String model, int capacity, String currentCity,
                   String availableStatus, int pricePerKM, double avgSpeed, Driver driver) {
        super();
        this.name = name;
        this.vehicleNo = vehicleNo;
        this.type = type;
        this.model = model;
        this.capacity = capacity;
        this.currentCity = currentCity;
        this.availableStatus = availableStatus;
        this.pricePerKM = pricePerKM;
        this.avgSpeed = avgSpeed;
        this.driver = driver;
    }

    @Override
    public String toString() {
        return "Vehicle [id=" + id + ", name=" + name + ", vehicleNo=" + vehicleNo + "]";
    }
}
