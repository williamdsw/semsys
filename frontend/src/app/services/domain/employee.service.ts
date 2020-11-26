import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { PersonService } from './person.service';

import { EmployeeNewDTO } from 'src/app/models/domain/employee.new.dto';
import { EmployeeDTO } from 'src/app/models/domain/employee.dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends PersonService {

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public findAllEmployees() {
    return this.listAll (`${environment.API}/v1/protected/employees`);
  }

  public findAllByName(params: HttpParams) {
    return this.listAll (`${environment.API}/v1/protected/employees/name`, params)
  }

  public findByEmail(email: string) {
    return this.findPersonByEmail (`${environment.API}/v1/admin/employees/email`, email);
  }

  public findBySSN(socialSecurityNumber: string) {
    return this.findPersonBySSN (`${environment.API}/v1/admin/employees/ssn`, socialSecurityNumber);
  }

  public insertEmployee(employee: EmployeeNewDTO) {
    return this.insertPerson (`${environment.API}/v1/admin/employees`, employee);
  }

  public updateEmployee(employee: EmployeeDTO) {
    return this.updatePerson (`${environment.API}/v1/protected/employees/${employee.getId ()}`, employee);
  }
}
