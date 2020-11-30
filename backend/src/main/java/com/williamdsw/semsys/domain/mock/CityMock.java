package com.williamdsw.semsys.domain.mock;

import java.io.Serializable;
import java.util.List;

import com.williamdsw.semsys.domain.City;
import com.williamdsw.semsys.domain.State;

public class CityMock implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;
	private String name;
	private Integer stateId;
	
	public CityMock() {}
	public CityMock(Integer id, String name, Integer stateId) {
		super();
		this.id = id;
		this.name = name;
		this.stateId = stateId;
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

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}
	
	public City toCity() {
		return new City(this.id, this.name, null);
	}
	
	public City toCity(List<State> states) {
		State state = states.stream().filter(st -> st.getId().equals(this.stateId)).findFirst().get();
		return new City(this.id, this.name, state);
	}
}