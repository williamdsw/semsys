package com.williamdsw.semsys.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class State implements Serializable {
	// FIELDS

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;
	private String abbreviation;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "country_id")
	private Country country;

	@JsonIgnore
	@OneToMany(mappedBy = "state")
	private List<City> cities = new ArrayList<>();

	// CONSTRUCTORS

	public State() {
	}
	
	public State(Integer id, String name, String abbreviation, Country country) {
		super();
		this.id = id;
		this.name = name;
		this.country = country;
		this.abbreviation = abbreviation;
	}

	// GETTERS / SETTERS

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

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public List<City> getCities() {
		return cities;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

	// OVERRIDED FUNCTIONS

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		State other = (State) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		StringBuilder str = new StringBuilder();
		str.append(" id: ").append(this.id);
		str.append(" | name: ").append(this.name);
		str.append(" | abbreviation: ").append(this.abbreviation);
		str.append(" | country: ").append(this.getCountry().getName());
		return str.toString();
	}
}