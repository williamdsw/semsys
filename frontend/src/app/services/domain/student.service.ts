import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { PersonService } from './person.service';

import { StudentNewDTO } from 'src/app/models/domain/new-dto/student.new.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';
import { Observable } from 'rxjs';
import { PersonDTO } from 'src/app/models/domain/dto/person.dto';
import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { PersonNewDTO } from 'src/app/models/domain/new-dto/person.new.dto';
import { EmployeeNewDTO } from 'src/app/models/domain/new-dto/employee.new.dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends PersonService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.protectedUrl = `${environment.API}/v1/protected/students`;
  }

  public findAllStudents() {
    return this.listAll (this.protectedUrl);
  }

  public findAllByName(params: HttpParams) {
    return this.listAll (`${this.protectedUrl}/name`, params);
  }

  public findByKeyAndValueWhereUrlIs(url, key, value):
      Observable<(PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO)> {
    return this.findByKeyAndValueWhereUrlIs(url, key, value);
  }

  public findByEmail(email: string) {
    return this.findPersonByEmail (`${this.protectedUrl}/email`, email);
  }

  public findBySSN(socialSecurityNumber: string) {
    return this.findPersonBySSN (`${this.protectedUrl}/ssn`, socialSecurityNumber);
  }

  public insertStudent(student: StudentNewDTO) {
    return this.insertPerson (`${environment.API}/v1/public/students`, student);
  }

  public updateStudent(student: StudentDTO) {
    return this.updatePerson (`${this.protectedUrl}/${student.getId ()}`, student);
  }
}
