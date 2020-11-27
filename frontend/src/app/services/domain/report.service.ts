import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { ReportDTO } from 'src/app/models/domain/dto/report.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends CrudService<ReportDTO> {

  private baseUrl: string;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.API + '/v1/protected/reports';
  }

  public findById(id: number): Observable<ReportDTO> {
    return this.findUnique (`${this.baseUrl}/${id}`);
  }

  public findBySchedule(scheduleId: number): Observable<ReportDTO> {
    return this.findUnique (`${this.baseUrl}/schedule/${scheduleId}`);
  }

  public findAllByEmployee(employeeId: number): Observable<ReportDTO[]> {
    return this.listAll (`${this.baseUrl}/employee/${employeeId}`);
  }

  public findAllByStudent(studentId: number): Observable<ReportDTO[]> {
    return this.listAll (`${this.baseUrl}/student/${studentId}`);
  }

  public insertReport(report: ReportDTO): Observable<object> {
    return this.insert (`${this.baseUrl}`, report);
  }
}
