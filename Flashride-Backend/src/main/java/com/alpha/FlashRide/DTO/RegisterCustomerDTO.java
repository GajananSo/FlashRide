package com.alpha.FlashRide.DTO;

public class RegisterCustomerDTO {

	private String name;
	private Integer age;
	private String gender;
	private Long mobileNo;
	private String emailId;
	private String latitude;
	private String Longitude;
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
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

	public Long getMobileNo() {
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

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return Longitude;
	}

	public void setLongitude(String Longitude) {
		this.Longitude = Longitude;
	}

	public RegisterCustomerDTO(String name, Integer age, String gender, Long mobileNo, String emailId, String latitude,
			String Longitude,String passowrd) {
		super();
		this.name = name;
		this.age = age;
		this.gender = gender;
		this.mobileNo = mobileNo;
		this.emailId = emailId;
		this.latitude = latitude;
		this.Longitude = Longitude;
		this.password=passowrd;
	}

	public RegisterCustomerDTO() {
		super();
	}

	@Override
	public String toString() {
		return "RegisterCustomerDTO [name=" + name + ", age=" + age + ", gender=" + gender + ", mobileNo=" + mobileNo
				+ ", emailId=" + emailId + ", latitude=" + latitude + ", Longitude=" + Longitude + "]";
	}

}
