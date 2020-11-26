import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { ReportDTO } from 'src/app/models/domain/report.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends CrudService<ReportDTO> {

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public findById(id: number) {
    return this.findUnique (`${environment.API}/v1/protected/reports/${id}`);
  }

  public findBySchedule(scheduleId: number) {
    return this.findUnique (`${environment.API}/v1/protected/reports/schedule/${scheduleId}`);
  }

  public findAllByEmployee(employeeId: number) {
    return this.listAll (`${environment.API}/v1/protected/reports/employee/${employeeId}`);
  }

  public findAllByStudent(studentId: number) {
    return this.listAll (`${environment.API}/v1/protected/reports/student/${studentId}`);
  }

  public insertReport(report: ReportDTO) {
    return this.insert (`${environment.API}/v1/protected/reports`, report);
  }
}
