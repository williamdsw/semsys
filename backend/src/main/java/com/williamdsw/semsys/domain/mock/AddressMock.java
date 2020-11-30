package com.williamdsw.semsys.domain.mock;

import java.io.Serializable;
import java.util.List;

import com.williamdsw.semsys.domain.Address;
import com.williamdsw.semsys.domain.City;
import com.williamdsw.semsys.domain.Employee;
import com.williamdsw.semsys.domain.Student;

public class AddressMock implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String publicPlace;
	private String number;
	private String complement;
	private String zipCode;
	private Integer employeeId;
	private Integer studentId;
	private Integer cityId;
	
	public AddressMock() {}
	public AddressMock(Integer id, String publicPlace, String number, String complement, String zipCode,
			Integer employeeId, Integer studentId, Integer cityId) {
		super();
		this.id = id;
		this.publicPlace = publicPlace;
		this.number = number;
		this.complement = complement;
		this.zipCode = zipCode;
		this.employeeId = employeeId;
		this.studentId = studentId;
		this.cityId = cityId;
	}

	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getPublicPlace() {
		return publicPlace;
	}
	
	public void setPublicPlace(String publicPlace) {
		this.publicPlace = publicPlace;
	}
	
	public String getNumber() {
		return number;
	}
	
	public void setNumber(String number) {
		this.number = number;
	}
	
	public String getComplement() {
		return complement;
	}
	
	public void setComplement(String complement) {
		this.complement = complement;
	}
	
	public String getZipCode() {
		return zipCode;
	}
	
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	public Integer getEmployeeId() {
		return employeeId;
	}
	
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	
	public Integer getStudentId() {
		return studentId;
	}
	
	public void setStudentId(Integer studentId) {
		this.studentId = studentId;
	}
	
	public Integer getCityId() {
		return cityId;
	}
	
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}
	
	public Address toAddress() {
		return new Address(this.id, this.publicPlace, this.number, this.complement, this.zipCode, null, null);
	}
	
	public Address toAddress(List<Employee> employees, List<Student> students, List<City> cities) {
		City city = cities.stream().filter(c -> c.getId().equals(this.cityId)).findFirst().get();
		
		if (this.employeeId != null && this.employeeId >= 1) {
			Employee employee = employees.stream().filter(emp -> emp.getId().equals(this.employeeId)).findFirst().get();
			return new Address(this.id, this.publicPlace, this.number, this.complement, this.zipCode, employee, city);
		}
		else if (this.studentId != null && this.studentId >= 1) {
			Student student = students.stream().filter(st -> st.getId().equals(this.studentId)).findFirst().get();
			return new Address(this.id, this.publicPlace, this.number, this.complement, this.zipCode, student, city);
		}
		
		return null;
	}
}
