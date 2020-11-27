import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { SchoolClassDTO } from 'src/app/models/domain/dto/school-class.dto';
import { SchoolClassNewDTO } from 'src/app/models/domain/new-dto/school-class.new.dto';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService extends CrudService<SchoolClassDTO | SchoolClassNewDTO> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public findAllByCourseAndName(courseId: number, name: string):
      Observable<(SchoolClassDTO | SchoolClassNewDTO)[]> {
    let params = new HttpParams ();
    params = params.set ('name', name);
    return this.listAll (`${environment.API}/v1/public/courses/${courseId}/classes`, params);
  }

  public insertSchoolClass(schoolClass: SchoolClassNewDTO): Observable<object> {
    return this.insert (`${environment.API}/v1/admin/classes`, schoolClass);
  }
}
