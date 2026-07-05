package com.alpha.FlashRide.DTO;

public class LoginRequestDTO {

    private Long mobileNo;
    private String password;

    public Long getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(long mobileNo) {
        this.mobileNo = mobileNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
