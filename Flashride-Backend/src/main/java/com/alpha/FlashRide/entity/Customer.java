package com.alpha.FlashRide.entity;

	import java.util.ArrayList;
	import java.util.List;

	import com.fasterxml.jackson.annotation.JsonIgnore;

	import jakarta.persistence.Column;
	import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;

	import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

	@Entity
	public class Customer {
		
		public Userr getUserr() {
			return userr;
		}

		public void setUserr(Userr userr) {
			this.userr = userr;
		}

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private int id; 

		private String name;
		private int age; 
		private String gender;
		private long mobileNo; 
		private String emailId;
		private String currentLoc;
		private int penaltyCount = 0; 

		@OneToOne
		private Userr userr;
		
		@Column(name="bookingflag")
		private boolean bookingflag = false;
		
		@OneToMany
		@JsonIgnore
		private List<Booking> bookinglist = new ArrayList<>();
		
		

		public Customer(int id, String name, int age, String gender, long mobileNo, String emailId, String currentLoc,
				int penaltyCount, Userr userr, boolean bookingflag, List<Booking> bookinglist) {
			super();
			this.id = id;
			this.name = name;
			this.age = age;
			this.gender = gender;
			this.mobileNo = mobileNo;
			this.emailId = emailId;
			this.currentLoc = currentLoc;
			this.penaltyCount = penaltyCount;
			this.userr = userr;
			this.bookingflag = bookingflag;
			this.bookinglist = bookinglist;
		}

		public Customer() {
			// TODO Auto-generated constructor stub
		}

		public int getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public int getAge() {
			return age;
		}

		public void setAge(Integer age) {
			this.age = age;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public long getMobileNo() {
			return mobileNo;
		}

		public void setMobileNo(Long mobileNo) {
			this.mobileNo = mobileNo;
		}

		public String getEmailId() {
			return emailId;
		}

		public void setEmailId(String emailId) {
			this.emailId = emailId;
		}

		public String getCurrentLoc() {
			return currentLoc;
		}

		public void setCurrentLoc(String currentLoc) {
			this.currentLoc = currentLoc;
		}

		public int getPenaltyCount() {
			return penaltyCount;
		}

		public void setPenaltyCount(Integer penaltyCount) {
			this.penaltyCount = penaltyCount;
		}

		public boolean isBookingflag() {
			return bookingflag;
		}

		public void setBookingflag(boolean bookingflag) {
			this.bookingflag = bookingflag;
		}

		public List<Booking> getBookinglist() {
			return bookinglist;
		}

		public void setBookinglist(List<Booking> bookinglist) {
			this.bookinglist = bookinglist;
		}

		@Override
		public String toString() {
			return "Customer [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender + ", mobileNo="
					+ mobileNo + ", emailId=" + emailId + ", currentLoc=" + currentLoc + ", penaltyCount="
					+ penaltyCount + ", userr=" + userr + ", bookingflag=" + bookingflag + ", bookinglist="
					+ bookinglist + "]";
		}
		
		

		
	}


