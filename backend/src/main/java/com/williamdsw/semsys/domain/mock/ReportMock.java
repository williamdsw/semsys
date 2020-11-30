package com.williamdsw.semsys.domain.mock;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.List;

import com.williamdsw.semsys.domain.MeetingSchedule;
import com.williamdsw.semsys.domain.Report;

public class ReportMock implements Serializable {
	
	SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String title;
	private String content;
	private String emission;
	private Integer scheduleId;

	public ReportMock() {}
	public ReportMock(Integer id, String title, String content, String emission, Integer scheduleId) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.emission = emission;
		this.scheduleId = scheduleId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	public String getEmission() {
		return emission;
	}
	
	public void setEmission(String emission) {
		this.emission = emission;
	}
	
	public Integer getScheduleId() {
		return scheduleId;
	}
	
	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}
	
	public Report toReport() {
		try {
			return new Report(this.id, this.title, this.content, dateFormat.parse(this.emission), null);
		} 
		catch (Exception e) {
			return null;
		}
	}
	
	public Report toReport(List<MeetingSchedule> meetingSchedules) {
		try {
			MeetingSchedule schedule = meetingSchedules.stream().filter(ms -> ms.getId().equals(this.scheduleId)).findFirst().get();
			return new Report(this.id, this.title, this.content, dateFormat.parse(this.emission), schedule);
		} 
		catch (Exception e) {
			return null;
		}
	}
}