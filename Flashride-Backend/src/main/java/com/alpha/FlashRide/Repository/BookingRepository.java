
package com.alpha.FlashRide.Repository;

import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.alpha.FlashRide.entity.Booking;

//@Repository
//public interface BookingRepository extends JpaRepository<Booking, Integer> {
//
//    // 1. Used for the HISTORY tab (Fetches every ride this customer ever took)
//    // IMPORTANT: Ensure the property name matches your Customer entity (mobileNo)
//    List<Booking> findByCustomer_MobileNo(Long mobileNo);
//    
//    Optional<Booking> findFirstByCustomerMobileNoAndBookingStatus(long mobileNo, String status);
//
//    // 2. Used for the DASHBOARD (Live Activity card)
//    // We look for 'BUSY' or 'BOOKED' status to show it's currently happening
//    @Query("SELECT b FROM Booking b WHERE b.customer.mobileNo = :mob AND b.bookingStatus = 'BOOKED'")
//    Booking findCurrentActiveBooking(@Param("mob") long mobileNo);
//
//    /**
//     * Fetches bookings for a specific driver on a specific date
//     * Chain: Booking -> Vehicle -> Driver
//     */
//    @Query("""
//        SELECT b FROM Booking b
//        JOIN b.vehicle v        
//        JOIN v.driver d        
//        WHERE d.id = :driverId  
//        AND b.bookingDate = :bookingDate  
//    """)
//    List<Booking> findByDriverIdAndBookingDate(
//            @Param("driverId") int driverId,
//            @Param("bookingDate") Date bookingDate);
//    
//    
//    @Query(value = "SELECT * FROM booking b WHERE b.customer_id = (SELECT id FROM customer WHERE mobile_no = :mobNo) AND b.booking_status = 'BOOKED' ORDER BY b.id DESC LIMIT 1", nativeQuery = true)
//    Booking findActiveBookingByCustomerId(@Param("mobNo") long mobNo);
//    
//    // Also add this for your History page to fix the 500 error
//    List<Booking> findByCustomerMobileNo(long mobileNo);
//    
//    @Query("SELECT b FROM Booking b WHERE b.customer.mobileNo = :mobNo AND b.bookingStatus = 'BOOKED' ORDER BY b.id DESC")
//    List<Booking> findActiveByMobile(@Param("mobNo") long mobNo);
//    
//    
//    
//    
//    List<Booking> findByCustomer(Customer customer);
//
//	
//}

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    // 1. Works for History: findBy + Customer (Entity) + MobileNo (Field)
    List<Booking> findByCustomerMobileNo(long mobileNo);

    // 2. Works for Dashboard: Standard JPQL (No native query bugs)
    @Query("SELECT b FROM Booking b WHERE b.customer.mobileNo = :mobNo " +
           "AND b.bookingStatus = 'BOOKED' " +
           "ORDER BY b.id DESC")
    List<Booking> findActiveByMobile(@Param("mobNo") long mobNo);

    // 3. Works for Driver Logic
    @Query("""
        SELECT b FROM Booking b
        JOIN b.vehicle v        
        JOIN v.driver d        
        WHERE d.id = :driverId  
        AND b.bookingDate = :bookingDate  
    """)
    List<Booking> findByDriverIdAndBookingDate(
            @Param("driverId") int driverId,
            @Param("bookingDate") Date bookingDate);
}