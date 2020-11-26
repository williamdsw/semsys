import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { MeetingScheduleService } from 'src/app/services/domain/meeting-schedule.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalService } from 'src/app/services/modal.service';

import { MeetingScheduleDTO } from 'src/app/models/domain/meeting-schedule.dto';
import { EmployeeDTO } from 'src/app/models/domain/employee.dto';
import { StudentDTO } from 'src/app/models/domain/student.dto';

import { MeetingStatus } from 'src/app/enums/meeting-status.enum';

import { BaseTableComponent } from 'src/app/shared/list-table/base-table/base-table.component';

@Component({
  selector: 'app-meeting-schedules-list',
  templateUrl: './meeting-schedules-list.component.html',
})
export class MeetingSchedulesListComponent extends BaseTableComponent<MeetingScheduleDTO> implements OnInit {

  // FIELDS

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

  // CONSTRUCTOR

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
    this.confirmBody = 'meeting-schedules.messages.cancel-confirmation';
    this.successMessage = 'meeting-schedules.messages.cancel-success';
    this.errorMessage = 'meeting-schedules.messages.cancel-error';
    this.tableHeaders = [
      'Id', 'meeting-schedules.datetime', 'meeting-schedules.employee',
      'meeting-schedules.student', 'meeting-schedules.status.status'
    ];

    Object.assign(this._localUser, storageService.getLocalUser());
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.onReload ();
  }

  // OVERRIDED FUNCTIONS

  public onDelete(): void {}
  public onReload(): void {
    this.hasError = false;
    this.records$ = this.loadData();
    this.toggleVisibility ('my', '');
  }

  public onUpdate(): void {

    const RESULT$ = this.modalService.showConfirm (this.confirmTitle, this.confirmBody);
    RESULT$.asObservable ().pipe (
      take (1),
      switchMap (result => {

        if (result) {
          this.selectedModel.setMeetingStatus ('Canceled');
          return this.meetingScheduleService.updateStatus (this.selectedModel);
        }

        return EMPTY;
      })
    ).subscribe (
      success => {
        console.log (this.currentStatus);
        this.records$ = this.loadData (this.currentStatus);
        this.modalService.showAlertSuccess (this.successTitle, this.successMessage);
      },
      error => this.modalService.showAlertDanger ( this.errorTitle, this.errorMessage)
    );
   }

  protected loadData(status?: string) {

    this.currentStatus = status;

    if (status && status !== 'All') {
      return this.pipeFindAll (this.meetingScheduleService.findAllByStatus (status));
    } else if (status && status === 'All') {
      return this.pipeFindAll (this.meetingScheduleService.findAll ());
    }

    if (this._localUser.getType () === 'Employee') {
      return this.pipeFindAll (this.meetingScheduleService.findAllByEmployee(this._localUser.getId()));
    } else if (this._localUser.getType () === 'Student') {
      return this.pipeFindAll (this.meetingScheduleService.findAllByStudent(this._localUser.getId()));
    }
  }

  // HELPER FUNCTIONS

  protected pipeFindAll(observable: Observable<any>) {
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

      catchError (error => {
        console.log (error);
        this.hasError = true;
        this.error$.next (true);
        this.handleError (this.loadingErrorTitle, this.loadingErrorMessage);
        return EMPTY;
      })
    ) as Observable<MeetingScheduleDTO[]>;
  }

  public setBagdeClass(status: string) {
    switch (status) {
      case 'Finished': {
        return 'badge badge-success';
      }

      case 'Canceled': {
        return 'badge badge-danger';
      }

      case 'Scheduled': default: {
        return 'badge badge-primary';
      }
    }
  }

  public toggleButtons(schedule: MeetingScheduleDTO) {
    this.selectedModel = schedule;

    const KEY = 'disabled';
    this.localCancelScheduleButton.nativeElement[KEY] = (schedule.getMeetingStatus () !== 'Scheduled');
    this.localNewReportButton.nativeElement[KEY] = (schedule.getMeetingStatus () !== 'Scheduled');
  }

  public listMeetingStatus(): string[] {

    const LIST_STATUS: string[] = ['All'];

    for (const STATUS in MeetingStatus) {
      if (MeetingStatus.hasOwnProperty (STATUS)) {
        LIST_STATUS.push (MeetingStatus[STATUS]);
      }
    }

    return LIST_STATUS;
  }

  public toggleVisibility(type: string, status?: string) {
    this.isHidden = (type === 'all');

    if (type === 'all' && status !== '') {
      this.records$ = this.loadData (status);
    } else if (type === 'my') {
      this.records$ = this.loadData ();
    }
  }

  public filterStatus(status: string) {
      this.records$ = this.loadData (status);
  }

  public showNewMeetingScheduleModal() {
    const RESULT$ = this.modalService.showNewMeetingSchedule ();
    RESULT$.asObservable ().pipe (take (1)).subscribe (
      (success: boolean) => {
        console.log (success);
        if (success) {
          this.modalService.showAlertSuccess ('modal.titles.success', 'meeting-schedules.messages.scheduled-success');
          this.records$ = this.loadData ();
        } else {
          this.modalService.showAlertDanger ('modal.titles.error', 'meeting-schedules.messages.scheduled-error');
        }
      },
      error => {
        this.modalService.showAlertDanger ('modal.titles.error', 'meeting-schedules.messages.scheduled-error');
      }
    );
  }

  public showNewReportModal() {
    const RESULT$ = this.modalService.showNewReport (this.selectedModel);
    RESULT$.asObservable ().pipe (take (1)).subscribe (
      (success: boolean) => {
        if (success) {
          this.modalService.showAlertSuccess ('modal.titles.success', 'report.messages.report-success');
          this.records$ = this.loadData ();
        } else {
          this.modalService.showAlertDanger ('modal.titles.error!', 'report.messages.report-error');
        }
      },
      error => {
        this.modalService.showAlertDanger ('modal.titles.error!', 'report.messages.report-error');
      }
    );
  }

  public containsProfile(profile: string) {
    return this.authenticationService.containsProfile (profile);
  }

  public getTranslatedStatus(status: string) {
    const KEY = `meeting-schedules.status.${status.toLowerCase ()}`;
    const INDEX = this.statusDescriptions.indexOf (KEY);
    return this.statusDescriptions[INDEX];
  }
}
