import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { PersonService } from './person.service';

import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { PersonDTO } from 'src/app/models/domain/dto/person.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';

import { EmployeeNewDTO } from 'src/app/models/domain/new-dto/employee.new.dto';
import { PersonNewDTO } from 'src/app/models/domain/new-dto/person.new.dto';
import { StudentNewDTO } from 'src/app/models/domain/new-dto/student.new.dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends PersonService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.protectedUrl = `${environment.API}/v1/protected/employees`;
    this.adminUrl = `${environment.API}/v1/admin/employees`;
  }

  public findAllEmployees():
      Observable<(PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO)[]> {
    return this.listAll (this.protectedUrl);
  }

  public findAllByName(params: HttpParams):
      Observable<(PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO)[]> {
    return this.listAll(`${this.protectedUrl}/name`, params);
  }

  public findByKeyAndValueWhereUrlIs(url, key, value):
      Observable<(PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO)> {
    return this.findByKeyAndValueWhereUrlIs(url, key, value);
  }

  public findByEmail(email: string):
      Observable<(PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO)> {
    return this.findPersonByEmail (`${this.adminUrl}/email`, email);
  }

  public findBySSN(socialSecurityNumber: string):
      Observable<(PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO)> {
    return this.findPersonBySSN (`${this.adminUrl}/ssn`, socialSecurityNumber);
  }

  public insertEmployee(employee: EmployeeNewDTO): Observable<object> {
    return this.insertPerson (`${this.adminUrl}`, employee);
  }

  public updateEmployee(employee: EmployeeDTO): Observable<object> {
    return this.updatePerson (`${this.protectedUrl}/${employee.getId ()}`, employee);
  }
}
