package com.williamdsw.semsys.domain.mock;

import java.io.Serializable;
import java.util.List;

import com.williamdsw.semsys.domain.Country;
import com.williamdsw.semsys.domain.State;

public class StateMock implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String name;
	private String abbreviation;
	private Integer countryId;
	
	public StateMock() {}
	public StateMock(Integer id, String name, String abbreviation, Integer countryId) {
		super();
		this.id = id;
		this.name = name;
		this.abbreviation = abbreviation;
		this.countryId = countryId;
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

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public Integer getCountryId() {
		return countryId;
	}

	public void setCountryId(Integer countryId) {
		this.countryId = countryId;
	}
	
	public State toState() {
		return new State(this.id, this.name, this.abbreviation, null);
	}
	
	public State toState(List<Country> countries) {
		Country country = countries.stream().filter(c -> c.getId().equals(this.countryId)).findFirst().get();
		return new State(this.id, this.name, this.abbreviation, country);
	}
}