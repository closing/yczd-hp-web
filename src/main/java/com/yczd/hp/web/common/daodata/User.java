package com.yczd.hp.web.common.daodata;

import java.sql.Date;

public class User {
	private Integer id;
 
	private String userType;
	private String userName;

	private String mobilePhone;
	private String email;
	private String drivingLicenseType;

	private String name;
	private String sex;
	private Date birthday;

	private Integer address1;
	private Integer address2;
	private Integer address3;
	private String address4;

	private String contact;
	private String companyName;
	private String telphone1;
	private String telphone2;
	private String telphone3;
	private String telphone;

	private boolean subscribe;
	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getDrivingLicenseType() {
		return drivingLicenseType;
	}

	public void setDrivingLicenseType(String drivingLicenseType) {
		this.drivingLicenseType = drivingLicenseType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Integer getAddress1() {
		return address1;
	}

	public void setAddress1(Integer address1) {
		this.address1 = address1;
	}

	public Integer getAddress2() {
		return address2;
	}

	public void setAddress2(Integer address2) {
		this.address2 = address2;
	}

	public Integer getAddress3() {
		return address3;
	}

	public void setAddress3(Integer address3) {
		this.address3 = address3;
	}

	public String getAddress4() {
		return address4;
	}

	public void setAddress4(String address4) {
		this.address4 = address4;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getTelphone1() {
		return telphone1;
	}

	public void setTelphone1(String telphone1) {
		this.telphone1 = telphone1;
	}

	public String getTelphone2() {
		return telphone2;
	}

	public void setTelphone2(String telphone2) {
		this.telphone2 = telphone2;
	}

	public String getTelphone3() {
		return telphone3;
	}

	public void setTelphone3(String telphone3) {
		this.telphone3 = telphone3;
	}

	public String getTelphone() {
		return telphone;
	}

	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}

	public boolean isSubscribe() {
		return subscribe;
	}

	public void setSubscribe(boolean subscribe) {
		this.subscribe = subscribe;
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
 

}

