import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { PersonDTO } from 'src/app/models/domain/dto/person.dto';
import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';
import { PersonNewDTO } from 'src/app/models/domain/new-dto/person.new.dto';
import { EmployeeNewDTO } from 'src/app/models/domain/new-dto/employee.new.dto';
import { StudentNewDTO } from 'src/app/models/domain/new-dto/student.new.dto';
import { Observable } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudService<PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO> {

  protected adminUrl: string;
  protected protectedUrl: string;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.adminUrl = `${environment.API}/v1/admin/persons`;
    this.protectedUrl = `${environment.API}/v1/protected/persons`;
  }

  public findAllPersons():
      Observable<(PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO)[]> {
    return this.listAll (this.adminUrl);
  }

  public findPersonById(id: number):
      Observable<PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO> {
    return this.findUnique (`${this.protectedUrl}/${id}`);
  }

  private findUniqueByField(url: string, key: string, value: string):
      Observable<PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO> {
    let params = new HttpParams ();
    params = params.set (key, value);
    return this.findUnique (url, params);
  }

  public findPersonByKeyAndValueWhereUrlIs(url: string, key: string, value: string):
      Observable<PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO> {
    return this.findUniqueByField(url, key, value);
  }

  public findPersonByEmail(url: string, email: string):
      Observable<PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO> {
    return this.findUniqueByField (url, 'value', email);
  }

  public findPersonBySSN(url: string, ssn: string):
      Observable<PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO> {
    return this.findUniqueByField (url, 'value', ssn);
  }

  protected insertPerson(url: string, person: PersonNewDTO): Observable<object> {
    return this.insert (url, person);
  }

  protected updatePerson(url: string, person: PersonDTO): Observable<object> {
    return this.update (url, person);
  }

  public deletePerson(id: number): Observable<object> {
    return this.delete (`${this.adminUrl}/${id}`);
  }

  public updateUserImage(fileImage: File): Observable<HttpResponse<any>> {
    const formData = new FormData ();
    formData.append ('file', fileImage);
    const url = `${this.protectedUrl}/upload-picture`;
    return this.httpClient.post (url, formData, { observe: 'response' });
  }

}
