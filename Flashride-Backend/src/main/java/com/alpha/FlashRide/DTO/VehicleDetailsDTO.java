//package com.alpha.FlashRide.DTO;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import com.alpha.FlashRide.entity.Vehicle;
//
//public class VehicleDetailsDTO {
//	//@Autowired
//	private Vehicle v;
//	private int fare;
//	private int estimatedTime;
//	private double averagespeed;
//	public Vehicle getV() {
//		return v;
//	}
//	public void setV(Vehicle v) {
//		this.v = v;
//	}
//	public int getFare() {
//		return fare;
//	}
//	public void setFare(int fare) {
//		this.fare = fare;
//	}
//	public int getEstimatedTime() {
//		return estimatedTime;
//	}
//	public void setEstimatedTime(int estimatedTime) {
//		this.estimatedTime = estimatedTime;
//	}
//	public double getAveragespeed() {
//		return averagespeed;
//	}
//	public void setAveragespeed(double averagespeed) {
//		this.averagespeed = averagespeed;
//	}
//	public VehicleDetailsDTO(Vehicle v, int fare, int estimatedTime, double averagespeed) {
//		super();
//		this.v = v;
//		this.fare = fare;
//		this.estimatedTime = estimatedTime;
//		this.averagespeed = averagespeed;
//	}
//	public VehicleDetailsDTO() {
//		super();
//	}
//	
//	
//	
//	
//	
//
//}

package com.alpha.FlashRide.DTO;

import com.alpha.FlashRide.entity.Vehicle;

public class VehicleDetailsDTO {
    // 1. Basic Fields (Required for the 'findallvehicle' service method)
    private int vehicleId;
    private String vehicleModel;
    private String vehicleNumber;
    private String vehicleType;
    private double baseFare;

    // 2. Complex Fields (Used in your specialized service methods)
    private Vehicle v;
    private int fare;
    private int estimatedTime;
    private double averagespeed;

    // --- CONSTRUCTORS ---
    public VehicleDetailsDTO() {
        super();
    }

    public VehicleDetailsDTO(int vehicleId, String vehicleModel, String vehicleNumber, 
                             String vehicleType, double baseFare) {
        this.vehicleId = vehicleId;
        this.vehicleModel = vehicleModel;
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.baseFare = baseFare;
    }

    // --- GETTERS & SETTERS (Important for Service layer access) ---

    public int getVehicleId() { return vehicleId; }
    public void setVehicleId(int vehicleId) { this.vehicleId = vehicleId; }

    public String getVehicleModel() { return vehicleModel; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public double getBaseFare() { return baseFare; }
    public void setBaseFare(double baseFare) { this.baseFare = baseFare; }

    public Vehicle getV() { return v; }
    public void setV(Vehicle v) { this.v = v; }

    public int getFare() { return fare; }
    public void setFare(int fare) { this.fare = fare; }

    public int getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(int estimatedTime) { this.estimatedTime = estimatedTime; }

    public double getAveragespeed() { return averagespeed; }
    public void setAveragespeed(double averagespeed) { this.averagespeed = averagespeed; }

    @Override
    public String toString() {
        return "VehicleDetailsDTO [id=" + vehicleId + ", model=" + vehicleModel + "]";
    }
}
