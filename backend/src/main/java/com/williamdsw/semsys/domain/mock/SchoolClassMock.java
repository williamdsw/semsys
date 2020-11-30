package com.williamdsw.semsys.domain.mock;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.List;

import com.williamdsw.semsys.domain.Course;
import com.williamdsw.semsys.domain.SchoolClass;

public class SchoolClassMock implements Serializable {
	
	private SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String name;
	Integer courseId;
	private String start;
	private String end;

	public SchoolClassMock() {}
	public SchoolClassMock(Integer id, String name, Integer courseId, String start, String end) {
		super();
		this.id = id;
		this.name = name;
		this.courseId = courseId;
		this.start = start;
		this.end = end;
	}
	
	public Integer getId() {
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
	
	public Integer getCourseId() {
		return courseId;
	}
	
	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}
	
	public String getStart() {
		return start;
	}
	
	public void setStart(String start) {
		this.start = start;
	}
	
	public String getEnd() {
		return end;
	}
	
	public void setEnd(String end) {
		this.end = end;
	}
	
	public SchoolClass toSchoolClass() {
		try {
			return new SchoolClass(this.id, this.name, null, dateFormat.parse(start), dateFormat.parse(end));
		} 
		catch (Exception e) {
			return null;
		}
	}
	
	public SchoolClass toSchoolClass(List<Course> courses) {
		try {
			Course course = courses.stream().filter(c -> c.getId().equals(this.courseId)).findFirst().get();
			return new SchoolClass(this.id, this.name, course, dateFormat.parse(start), dateFormat.parse(end));
		} 
		catch (Exception e) {
			return null;
		}
	}
}