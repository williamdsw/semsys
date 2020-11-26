package com.williamdsw.semsys.domain.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.williamdsw.semsys.domain.SchoolClass;
import com.williamdsw.semsys.domain.Student;

public class StudentDTO extends PersonDTO {
	// FIELDS

	private static final long serialVersionUID = 1L;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date birthdate;

	private String schoolClass;
	private String course;

	// CONSTRUCTORS

	public StudentDTO() {
	}

	public StudentDTO(Student student) {
		super(student);
		this.birthdate = student.getBirthdate();

		if (student.getSchoolClass() != null) {
			SchoolClass myClass = student.getSchoolClass();
			this.schoolClass = myClass.getName();
			
			if (myClass.getCourse() != null) {
				this.course = myClass.getCourse().getName();
			}
		}
	}

	// GETTERS / SETTERS

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getSchoolClass() {
		return schoolClass;
	}

	public void setSchoolClass(String schoolClass) {
		this.schoolClass = schoolClass;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}
}