package com.williamdsw.semsys.domain.newdto;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.williamdsw.semsys.domain.SchoolClass;
import com.williamdsw.semsys.domain.Student;

public class StudentNewDTO extends PersonNewDTO {
	// FIELDS

	private static final long serialVersionUID = 1L;

	@NotNull(message = "Birthdate is required")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthdate;

	@NotNull(message = "Class is required")
	private Integer schoolClassId;

	// CONSTRUCTORS

	public StudentNewDTO() {
	}

	// GETTERS / SETTERS

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public Integer getSchoolClassId() {
		return schoolClassId;
	}

	public void setSchoolClassId(Integer schooClassId) {
		this.schoolClassId = schooClassId;
	}
	
	public Student toStudent() {
		return new Student(this.id, this.name, this.email, this.socialSecurityNumber, this.birthdate, password, null, null);
	}
	
	public Student toStudent(List<SchoolClass> schoolClasses) {
		SchoolClass schoolClass = schoolClasses.stream().filter(sc -> sc.getId().equals(this.schoolClassId)).findFirst().get();		
		Student student = new Student(this.id, this.name, this.email, this.socialSecurityNumber, this.birthdate, password, null, schoolClass);
		student.getPhoneNumbers().addAll(getPhoneNumbers());
		return student;
	}
}