import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { MeetingScheduleDTO } from 'src/app/models/domain/meeting-schedule.dto';
import { MeetingScheduleNewDTO } from 'src/app/models/domain/meeting-schedule.new.dto';

@Injectable({
  providedIn: 'root'
})
export class MeetingScheduleService extends CrudService<MeetingScheduleDTO | MeetingScheduleNewDTO> {

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public findById(id: number) {
    return this.findUnique (`${environment.API}/v1/protected/schedules/${id}`);
  }

  public findAll() {
    return this.listAll (`${environment.API}/v1/protected/schedules`);
  }

  public findAllByEmployee(employeeId: number) {
    return this.listAll (`${environment.API}/v1/protected/schedules/employee/${employeeId}`);
  }

  public findAllByStudent(studentId: number) {
    return this.listAll (`${environment.API}/v1/protected/schedules/student/${studentId}`);
  }

  public findAllByStatus(status: string) {
    let params = new HttpParams ();
    params = params.set ('value', status);
    return this.listAll (`${environment.API}/v1/protected/schedules/status`, params);
  }

  public insertMeetingSchedule(meetingSchedule: MeetingScheduleNewDTO) {
    return this.insert (`${environment.API}/v1/protected/schedules`, meetingSchedule);
  }

  public updateStatus(meetingSchedule: MeetingScheduleDTO) {
    return this.update (`${environment.API}/v1/protected/schedules/${meetingSchedule.getId ()}`, meetingSchedule);
  }
}
