import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { SchoolClassDTO } from 'src/app/models/domain/school-class.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SchoolClassNewDTO } from 'src/app/models/domain/school-class.new.dto';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService extends CrudService<SchoolClassDTO | SchoolClassNewDTO> {

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public findAllByCourseAndName(courseId: number, name: string) {
    let params = new HttpParams ();
    params = params.set ('name', name);
    return this.listAll (`${environment.API}/v1/public/courses/${courseId}/classes`, params);
  }

  public insertSchoolClass(schoolClass: SchoolClassNewDTO) {
    return this.insert (`${environment.API}/v1/admin/classes`, schoolClass);
  }
}
