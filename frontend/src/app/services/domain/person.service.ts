import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { PersonDTO } from 'src/app/models/domain/dto/person.dto';
import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';
import { PersonNewDTO } from 'src/app/models/domain/new-dto/person.new.dto';
import { EmployeeNewDTO } from 'src/app/models/domain/new-dto/employee.new.dto';
import { StudentNewDTO } from 'src/app/models/domain/new-dto/student.new.dto';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends CrudService<PersonDTO | EmployeeDTO | StudentDTO | PersonNewDTO | EmployeeNewDTO | StudentNewDTO> {

  // CONSTRUCTORs

  constructor(protected httpClient: HttpClient) {
    super (httpClient);
  }

  // HELPER FUNCTIONS

  public findAllPersons() {
    return this.listAll (`${environment.API}/v1/admin/persons`);
  }

  public findPersonById(id: number) {
    return this.findUnique (`${environment.API}/v1/protected/persons/${id}`);
  }

  private findUniqueByField(url: string, key: string, value: string) {
    let params = new HttpParams ();
    params = params.set (key, value);
    return this.findUnique (url, params);
  }

  public findPersonByEmail (url: string, email: string) {
    return this.findUniqueByField (url, 'value', email);
  }

  public findPersonBySSN (url: string, ssn: string) {
    return this.findUniqueByField (url, 'value', ssn);
  }

  protected insertPerson(url: string, person: PersonNewDTO) {
    return this.insert (url, person);
  }

  protected updatePerson(url: string, person: PersonDTO) {
    return this.update (url, person);
  }

  public deletePerson(id: number) {
    return this.delete (`${environment.API}/v1/admin/persons/${id}`);
  }

  public updateUserImage(fileImage: File) {
    let formData = new FormData ();
    formData.append ('file', fileImage);
    let url = `${environment.API}/v1/protected/persons/upload-picture`;
    return this.httpClient.post (url, formData, {
      observe: 'response'
    });
  }

}
