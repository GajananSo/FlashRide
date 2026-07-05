package com.alpha.FlashRide.DTO;

public class CustomerActiveBookingDTO {

    private String customername;
    private long customerMobile;
    private String currentLocation;
    
    // Flattened fields to prevent React crashes
    private String vehicleName;
    private String vehicleNumber;
    private int fare;
    private String bookingStatus;
    private int bookingId;

    // Getters and Setters
    public String getCustomername() { return customername; }
    public void setCustomername(String customername) { this.customername = customername; }

    public long getCustomerMobile() { return customerMobile; }
    public void setCustomerMobile(long customerMobile) { this.customerMobile = customerMobile; }

    public String getCurrentLocation() { return currentLocation; }
    public void setCurrentLocation(String currentLocation) { this.currentLocation = currentLocation; }

    public String getVehicleName() { return vehicleName; }
    public void setVehicleName(String vehicleName) { this.vehicleName = vehicleName; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public int getFare() { return fare; }
    public void setFare(int fare) { this.fare = fare; }

    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }

    public int getBookingId() { return bookingId; }
    public void setBookingId(int bookingId) { this.bookingId = bookingId; }

    public CustomerActiveBookingDTO() { super(); }
}