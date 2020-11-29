import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { MeetingScheduleService } from 'src/app/services/domain/meeting-schedule.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';

import { MeetingScheduleDTO } from 'src/app/models/domain/dto/meeting-schedule.dto';
import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';

import { MeetingStatus } from 'src/app/enums/meeting-status.enum';

import { BaseTableComponent } from 'src/app/shared/list-table/base-table/base-table.component';

@Component({
  selector: 'app-meeting-schedules-list',
  templateUrl: './meeting-schedules-list.component.html',
})
export class MeetingSchedulesListComponent extends BaseTableComponent<MeetingScheduleDTO> implements OnInit {

  public isHidden = true;
  private currentStatus: string;
  private localCancelScheduleButton: ElementRef;
  private localNewReportButton: ElementRef;

  @ViewChild('cancelScheduleButton') protected set cancelScheduleButton(button: ElementRef) {
    this.localCancelScheduleButton = button;
  }

  @ViewChild('newReportButton') protected set newReportButton(button: ElementRef) {
    this.localNewReportButton = button;
  }

  public statusDescriptions: string[] = [
    'global.other.all',
    'meeting-schedules.status.scheduled',
    'meeting-schedules.status.finished',
    'meeting-schedules.status.canceled'
  ];

  constructor(
    protected translateService: TranslateService,
    protected modalService: ModalService,
    protected storageService: StorageService,
    private authenticationService: AuthenticationService,
    private meetingScheduleService: MeetingScheduleService,
  ) {
    super(translateService, storageService, modalService);

    // default values
    this.globalHeader = 'global.menu-links.schedules';
    this.modalTexts.confirm.body = 'meeting-schedules.messages.cancel-confirmation';
    this.modalTexts.success.body = 'meeting-schedules.messages.cancel-success';
    this.modalTexts.error.body = 'meeting-schedules.messages.cancel-error';
    this.tableHeaders = [
      '#', 'meeting-schedules.datetime', 'meeting-schedules.employee',
      'meeting-schedules.student', 'meeting-schedules.status.status'
    ];

    Object.assign(this._localUser, storageService.getLocalUser());
  }

  ngOnInit(): void {
    this.onReload ();
  }

  public onDelete(): void {}
  public onReload(): void {
    this.hasError = false;
    this.records$ = this.loadData();
    this.toggleVisibility ('my', '');
  }

  public onUpdate(): void {

    const result$ = this.modalService.showConfirm (this.modalTexts.confirm.title, this.modalTexts.confirm.body);
    result$.asObservable().pipe(
      take(1),
      switchMap(result => {
        if (result) {
          this.selectedModel.setMeetingStatus('Canceled');
          return this.meetingScheduleService.updateStatus(this.selectedModel);
        }

        return EMPTY;
      })
    ).subscribe(
      () => {
        this.records$ = this.loadData(this.currentStatus);
        this.modalService.showAlertSuccess(this.modalTexts.success.title, this.modalTexts.success.body);
      },
      () => this.modalService.showAlertDanger(this.modalTexts.error.title, this.modalTexts.error.body)
    );
   }

  protected loadData(status?: string): Observable<MeetingScheduleDTO[]> {
    this.currentStatus = status;

    if (status) {
      if (status !== 'All') {
        return this.pipeFindAll (this.meetingScheduleService.findAllByStatus (status));
      }
      else {
        return this.pipeFindAll (this.meetingScheduleService.findAll ());
      }
    }

    if (this._localUser.getType () === 'Employee') {
      return this.pipeFindAll (this.meetingScheduleService.findAllByEmployee(this._localUser.getId()));
    }
    else if (this._localUser.getType() === 'Student') {
      return this.pipeFindAll (this.meetingScheduleService.findAllByStudent(this._localUser.getId()));
    }
  }

  protected pipeFindAll(observable: Observable<any>): Observable<MeetingScheduleDTO[]> {
    return observable.pipe (
      map(schedules => {
        return schedules.map((schedule) => {
          this.hasError = false;

          let dto = new MeetingScheduleDTO();
          let employee = new EmployeeDTO();
          let student = new StudentDTO();

          dto = Object.assign(dto, schedule);
          employee = Object.assign(employee, dto.getEmployee());
          student = Object.assign(student, dto.getStudent());

          dto.setEmployee(employee);
          dto.setStudent(student);

          return dto;
        });
      }),

      catchError (() => {
        this.hasError = true;
        this.error$.next (true);
        this.handleError (this.modalTexts.error.title, this.modalTexts.loading.body);
        return EMPTY;
      })
    ) as Observable<MeetingScheduleDTO[]>;
  }

  public setBagdeClass(status: string): string {
    switch (status) {
      case 'Finished': return 'badge badge-success';
      case 'Canceled': return 'badge badge-danger';
      case 'Scheduled': default: return 'badge badge-primary';
    }
  }

  public toggleButtons(schedule: MeetingScheduleDTO): void {
    this.selectedModel = schedule;

    const key = 'disabled';
    this.localCancelScheduleButton.nativeElement[key] = (schedule.getMeetingStatus () !== 'Scheduled');
    this.localNewReportButton.nativeElement[key] = (schedule.getMeetingStatus () !== 'Scheduled');
  }

  public listMeetingStatus(): string[] {
    const listStatus: string[] = ['All'];
    for (const status in MeetingStatus) {
      if (MeetingStatus.hasOwnProperty (status)) {
        listStatus.push (MeetingStatus[status]);
      }
    }

    return listStatus;
  }

  public toggleVisibility(type: string, status?: string): void {
    this.isHidden = (type === 'all');

    if (type === 'all' && status !== '') {
      this.records$ = this.loadData (status);
    }
    else if (type === 'my') {
      this.records$ = this.loadData ();
    }
  }

  public filterStatus(status: string): void{
      this.records$ = this.loadData (status);
  }

  public showNewMeetingScheduleModal(): void {
    const result$ = this.modalService.showNewMeetingSchedule ();
    result$.asObservable ().pipe (take (1)).subscribe (
      (success: boolean) => {
        if (success) {
          this.modalService.showAlertSuccess(this.modalTexts.success.title, 'meeting-schedules.messages.scheduled-success');
          this.records$ = this.loadData ();
        }
        else {
          this.modalService.showAlertDanger(this.modalTexts.error.title, 'meeting-schedules.messages.scheduled-error');
        }
      },
      () =>
        this.modalService.showAlertDanger(this.modalTexts.success.title, 'meeting-schedules.messages.scheduled-error')
    );
  }

  public showNewReportModal(): void {
    const result$ = this.modalService.showNewReport (this.selectedModel);
    result$.asObservable ().pipe (take (1)).subscribe (
      (success: boolean) => {
        if (success) {
          this.modalService.showAlertSuccess (this.modalTexts.success.title, 'report.messages.report-success');
          this.records$ = this.loadData ();
        } else {
          this.modalService.showAlertDanger (this.modalTexts.error.title, 'report.messages.report-error');
        }
      },
      () =>
        this.modalService.showAlertDanger (this.modalTexts.error.title, 'report.messages.report-error')
    );
  }

  public containsProfile(profile: string): boolean {
    return this.authenticationService.containsProfile (profile);
  }

  public getTranslatedStatus(status: string): string {
    const key = `meeting-schedules.status.${status.toLowerCase ()}`;
    const index = this.statusDescriptions.indexOf (key);
    return this.statusDescriptions[index];
  }
}
