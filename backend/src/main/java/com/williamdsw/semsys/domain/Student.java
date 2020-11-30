package com.williamdsw.semsys.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.williamdsw.semsys.domain.enums.Profile;

@Entity
@JsonTypeName(value = "student")
public class Student extends Person {

	private static final long serialVersionUID = 1L;
	private Date birthdate;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "class_id")
	private SchoolClass schoolClass;

	@JsonIgnore
	@OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
	private List<MeetingSchedule> schedules = new ArrayList<>();

	public Student() {
		this.addProfile(Profile.STUDENT);
	}

	public Student(Integer id, String name, String email, String socialSecurityNumber, Date birthdate, String password,
				   Address address, SchoolClass schoolClass) {
		super(id, name, email, socialSecurityNumber, password, address);
		this.birthdate = birthdate;
		this.schoolClass = schoolClass;
		this.addProfile(Profile.STUDENT);
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public SchoolClass getSchoolClass() {
		return schoolClass;
	}

	public void setSchoolClass(SchoolClass schoolClass) {
		this.schoolClass = schoolClass;
	}

	public List<MeetingSchedule> getSchedules() {
		return schedules;
	}

	public void setSchedules(List<MeetingSchedule> schedules) {
		this.schedules = schedules;
	}
}