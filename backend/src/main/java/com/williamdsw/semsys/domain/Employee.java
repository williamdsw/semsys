package com.williamdsw.semsys.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.williamdsw.semsys.domain.enums.Profile;

@Entity
@JsonTypeName(value = "employee")
public class Employee extends Person {

	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	private List<MeetingSchedule> schedules = new ArrayList<>();

	public Employee() {
		this.addProfile(Profile.EMPLOYEE);
	}

	public Employee(Integer id, String name, String email, String socialSecurityNumber, String password,
			Address address) {
		super(id, name, email, socialSecurityNumber, password, address);
		this.addProfile(Profile.EMPLOYEE);
	}

	public List<MeetingSchedule> getSchedules() {
		return schedules;
	}

	public void setSchedules(List<MeetingSchedule> schedules) {
		this.schedules = schedules;
	}

	@Override
	public String toString() {
		StringBuilder str = new StringBuilder();
		str.append(" id: ").append(this.getId());
		str.append(" | name: ").append(this.getName());
		str.append(" | email: ").append(this.getEmail());
		str.append(" | ssn: ").append(this.getSocialSecurityNumber());
		return str.toString();
	}
}