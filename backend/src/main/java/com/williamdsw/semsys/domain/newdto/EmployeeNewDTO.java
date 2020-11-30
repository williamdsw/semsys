package com.williamdsw.semsys.domain.newdto;

import com.williamdsw.semsys.domain.Employee;

public class EmployeeNewDTO extends PersonNewDTO {

	private static final long serialVersionUID = 1L;

	public EmployeeNewDTO() {
	}
	
	public Employee toEmployee() {
		Employee employee = new Employee(this.id, this.name, this.email, this.socialSecurityNumber, this.password, null);
		employee.getPhoneNumbers().addAll(getPhoneNumbers());
		return employee;
	}
}