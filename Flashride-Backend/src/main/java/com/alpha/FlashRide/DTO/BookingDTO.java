package com.alpha.FlashRide.DTO;


public class BookingDTO {
	
	private Integer vehicleid;	
	private String sourceLoc;
	private String destinationLoc;
	private Integer distanceTravelled;
	private Integer fare;
	private Integer estimatedTime;
	
	
	public Integer getVehicleid() {
		return vehicleid;
	}
	public void setVehicleid(Integer vehicleid) {
		this.vehicleid = vehicleid;
	}
	public String getSourceLoc() {
		return sourceLoc;
	}
	public void setSourceLoc(String sourceLoc) {
		this.sourceLoc = sourceLoc;
	}
	public String getDestinationLoc() {
		return destinationLoc;
	}
	public void setDestinationLoc(String destinationLoc) {
		this.destinationLoc = destinationLoc;
	}
	public Integer getDistanceTravelled() {
		return distanceTravelled;
	}
	public void setDistanceTravelled(Integer distanceTravelled) {
		this.distanceTravelled = distanceTravelled;
	}
	public Integer getFare() {
		return fare;
	}
	public void setFare(Integer fare) {
		this.fare = fare;
	}
	public Integer getEstimatedTime() {
		return estimatedTime;
	}
	public void setEstimatedTime(Integer estimatedTime) {
		this.estimatedTime = estimatedTime;
	}
	public BookingDTO(Integer vehicleid, String sourceLoc, String destinationLoc,
            Integer distanceTravelled, Integer fare, Integer estimatedTime) {
	this.vehicleid = vehicleid;
	this.sourceLoc = sourceLoc;
	this.destinationLoc = destinationLoc;
	this.distanceTravelled = distanceTravelled;
	this.fare = fare;
	this.estimatedTime = estimatedTime;
	}

	public BookingDTO() {
		super();
	}
	@Override
	public String toString() {
		return "BookingDTO [vehicleid=" + vehicleid + ", sourceLoc=" + sourceLoc + ", destinationLoc=" + destinationLoc
				+ ", distanceTravelled=" + distanceTravelled + ", fare=" + fare + ", estimatedTime=" + estimatedTime
				+ "]";
	}
}