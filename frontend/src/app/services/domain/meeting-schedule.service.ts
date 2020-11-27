import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { MeetingScheduleDTO } from 'src/app/models/domain/dto/meeting-schedule.dto';
import { MeetingScheduleNewDTO } from 'src/app/models/domain/new-dto/meeting-schedule.new.dto';

@Injectable({
  providedIn: 'root'
})
export class MeetingScheduleService extends CrudService<MeetingScheduleDTO | MeetingScheduleNewDTO> {

  private protectedUrl: string;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.protectedUrl = environment.API + '/v1/protected/schedules';
  }

  public findById(id: number): Observable<MeetingScheduleDTO | MeetingScheduleNewDTO> {
    return this.findUnique (`${this.protectedUrl}/${id}`);
  }

  public findAll(): Observable<(MeetingScheduleDTO | MeetingScheduleNewDTO)[]> {
    return this.listAll (this.protectedUrl);
  }

  public findAllByEmployee(employeeId: number):
      Observable<(MeetingScheduleDTO | MeetingScheduleNewDTO)[]> {
    return this.listAll (`${this.protectedUrl}/employee/${employeeId}`);
  }

  public findAllByStudent(studentId: number):
      Observable<(MeetingScheduleDTO | MeetingScheduleNewDTO)[]> {
    return this.listAll (`${this.protectedUrl}/student/${studentId}`);
  }

  public findAllByStatus(status: string):
      Observable<(MeetingScheduleDTO | MeetingScheduleNewDTO)[]> {
    let params = new HttpParams ();
    params = params.set ('value', status);
    return this.listAll (`${this.protectedUrl}/status`, params);
  }

  public insertMeetingSchedule(meetingSchedule: MeetingScheduleNewDTO): Observable<object> {
    return this.insert (this.protectedUrl, meetingSchedule);
  }

  public updateStatus(meetingSchedule: MeetingScheduleDTO): Observable<object> {
    return this.update (`${this.protectedUrl}/${meetingSchedule.getId ()}`, meetingSchedule);
  }
}
