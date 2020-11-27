import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { PersonService } from './person.service';
import { StudentNewDTO } from 'src/app/models/domain/new-dto/student.new.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends PersonService {

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public findAllStudents() {
    return this.listAll (`${environment.API}/v1/protected/students`);
  }

  public findAllByName(params: HttpParams) {
    return this.listAll (`${environment.API}/v1/protected/students/name`, params);
  }

  public findByEmail(email: string) {
    return this.findPersonByEmail (`${environment.API}/v1/protected/students/email`, email);
  }

  public findBySSN(socialSecurityNumber: string) {
    return this.findPersonBySSN (`${environment.API}/v1/protected/students/ssn`, socialSecurityNumber);
  }

  public insertStudent(student: StudentNewDTO) {
    return this.insertPerson (`${environment.API}/v1/public/students`, student);
  }

  public updateStudent(student: StudentDTO) {
    return this.updatePerson (`${environment.API}/v1/protected/students/${student.getId ()}`, student);
  }
}
