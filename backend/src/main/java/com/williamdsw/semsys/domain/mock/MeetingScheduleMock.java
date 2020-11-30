package com.williamdsw.semsys.domain.mock;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import com.williamdsw.semsys.domain.Employee;
import com.williamdsw.semsys.domain.MeetingSchedule;
import com.williamdsw.semsys.domain.Student;
import com.williamdsw.semsys.domain.enums.MeetingStatus;

public class MeetingScheduleMock implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String datetime;
	private String employeeSSN;
	private String studentSSN;
	private String meetingStatus;

	public MeetingScheduleMock() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	
	public String getEmployeeSSN() {
		return employeeSSN;
	}
	
	public void setEmployeeSSN(String employeeSSN) {
		this.employeeSSN = employeeSSN;
	}

	public String getStudentSSN() {
		return studentSSN;
	}
	
	public void setStudentSSN(String studentSSN) {
		this.studentSSN = studentSSN;
	}

	public String getMeetingStatus() {
		return meetingStatus;
	}

	public void setMeetingStatus(String meetingStatus) {
		this.meetingStatus = meetingStatus;
	}
	
	public MeetingSchedule toMeetingSchedule() {
		return new MeetingSchedule(this.id, LocalDateTime.parse(this.datetime), null, null, MeetingStatus.toEnum(this.meetingStatus));
	}
	
	public MeetingSchedule toMeetingSchedule(List<Employee> employees, List<Student> students) {
		Employee employee = employees.stream().filter(emp -> emp.getSocialSecurityNumber().equals(this.employeeSSN)).findFirst().get();
		Student student = students.stream().filter(st -> st.getSocialSecurityNumber().equals(this.studentSSN)).findFirst().get();
		return new MeetingSchedule(this.id, LocalDateTime.parse(this.datetime), employee, student, MeetingStatus.toEnum(this.meetingStatus));
	}
}