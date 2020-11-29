import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { AlertTypes } from '../enums/alert-types.enum';

import { MeetingScheduleDTO } from '../models/domain/dto/meeting-schedule.dto';
import { CourseDTO } from '../models/domain/dto/course.dto';

import { AlertModalComponent } from '../shared/modals/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../shared/modals/confirm-modal/confirm-modal.component';
import { ReportDetailsModalComponent } from '../shared/modals/report-details-modal/report-details-modal.component';
import { ValidationsModalComponent } from '../shared/modals/validations-modal/validations-modal.component';

import { MeetingSchedulesFormComponent } from '../views/meeting-schedules/meeting-schedules-form/meeting-schedules-form.component';
import { ReportsFormComponent } from '../views/reports/reports-form/reports-form.component';
import { SchoolClassesListComponent } from '../views/school-classes/school-classes-list/school-classes-list.component';
import { WaitModalComponent } from '../shared/modals/wait-modal/wait-modal.component';
import { CoursesFormComponent } from '../views/courses/courses-form/courses-form.component';
import { SchoolClassesFormComponent } from '../views/school-classes/school-classes-form/school-classes-form.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(title: string, message: string, type: AlertTypes, dismissTimeout?: number): void {
    const modalRef: BsModalRef = this.modalService.show (AlertModalComponent);
    modalRef.content.type = type;
    modalRef.content.title = title;
    modalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout (() => modalRef.hide (), dismissTimeout);
    }
  }

  public showAlertDanger(title: string, message: string): void {
    this.showAlert (title, message, AlertTypes.DANGER);
  }

  public showAlertSuccess(title: string, message: string): void {
    this.showAlert (title, message, AlertTypes.SUCCESS, 3000);
  }

  public showConfirm(title: string, body: string, cancelButtonText?: string, okButtonText?: string):
      Subject<boolean> {
    const modalRef: BsModalRef = this.modalService.show (ConfirmModalComponent);
    modalRef.content.title = title;
    modalRef.content.body = body;

    if (cancelButtonText) {
      modalRef.content.cancelButtonText = cancelButtonText;
    }

    if (okButtonText) {
      modalRef.content.okButtonText = okButtonText;
    }

    return (modalRef.content as ConfirmModalComponent).confirmResult;
  }

  public showReportDetails(employeeName: string, studentName: string, title: string, content: string, emission: Date): void {
    const modalRef = this.modalService.show (ReportDetailsModalComponent, { ignoreBackdropClick: true });
    modalRef.content.employeeName = employeeName;
    modalRef.content.studentName = studentName;
    modalRef.content.title = title;
    modalRef.content.content = content;
    modalRef.content.emission = emission;
  }

  public showValidations(fields: string[]): void {
    const modalRef = this.modalService.show (ValidationsModalComponent);
    modalRef.content.fields = fields;
  }

  public showNewMeetingSchedule(): Subject<boolean> {
    const modalRef = this.modalService.show (MeetingSchedulesFormComponent);
    return (modalRef.content as MeetingSchedulesFormComponent).confirmResult;
  }

  public showNewReport(schedule: MeetingScheduleDTO): Subject<boolean> {
    const modalRef = this.modalService.show (ReportsFormComponent);
    modalRef.content.schedule = schedule;
    return (modalRef.content as ReportsFormComponent).confirmResult;
  }

  public showSchoolClass(course: CourseDTO): void {
    const modalRef = this.modalService.show (SchoolClassesListComponent);
    modalRef.content.course = course;
    modalRef.setClass ('modal-lg');
  }

  public showWaitModal(): BsModalRef {
    const config: ModalOptions = { ignoreBackdropClick: true, keyboard: false };
    const modalRef = this.modalService.show (WaitModalComponent, config);
    return modalRef;
  }

  public showNewCourse(): Subject<boolean> {
    const modalRef = this.modalService.show (CoursesFormComponent);
    return (modalRef.content as CoursesFormComponent).confirmResult$;
  }

  public showNewSchoolClass(course: CourseDTO): Subject<boolean> {
    const modalRef = this.modalService.show (SchoolClassesFormComponent);
    modalRef.content.course = course;
    return (modalRef.content as SchoolClassesFormComponent).confirmResult;
  }

  public hideModal(modalRef: BsModalRef): void {
    if (modalRef) {
      modalRef.hide ();
    }
  }
}
