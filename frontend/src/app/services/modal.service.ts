import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertTypes } from '../enums/alert-types.enum';

import { MeetingScheduleDTO } from '../models/domain/meeting-schedule.dto';
import { CourseDTO } from '../models/domain/course.dto';

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

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // CONSTRUCTOR

  constructor(private modalService: BsModalService) { }

  // HELPER FUNCTIONS

  private showAlert(title: string, message: string, type: AlertTypes, dismissTimeout?: number) {
    const MODAL_REF: BsModalRef = this.modalService.show (AlertModalComponent);
    MODAL_REF.content.type = type;
    MODAL_REF.content.title = title;
    MODAL_REF.content.message = message;

    if (dismissTimeout) {
      setTimeout (() => MODAL_REF.hide (), dismissTimeout);
    }
  }

  public showAlertDanger(title: string, message: string) {
    this.showAlert (title, message, AlertTypes.DANGER);
  }

  public showAlertSuccess(title: string, message: string) {
    this.showAlert (title, message, AlertTypes.SUCCESS, 3000);
  }

  public showConfirm(title: string, body: string, cancelButtonText?: string, okButtonText?: string) {
    const MODAL_REF: BsModalRef = this.modalService.show (ConfirmModalComponent);
    MODAL_REF.content.title = title;
    MODAL_REF.content.body = body;

    if (cancelButtonText) {
      MODAL_REF.content.cancelButtonText = cancelButtonText;
    }

    if (okButtonText) {
      MODAL_REF.content.okButtonText = okButtonText;
    }

    return (MODAL_REF.content as ConfirmModalComponent).confirmResult;
  }

  public showReportDetails(employeeName: string, studentName: string, title: string, content: string, emission: Date) {
    const MODAL_REF: BsModalRef = this.modalService.show (ReportDetailsModalComponent);
    MODAL_REF.content.employeeName = employeeName;
    MODAL_REF.content.studentName = studentName;
    MODAL_REF.content.title = title;
    MODAL_REF.content.content = content;
    MODAL_REF.content.emission = emission;
  }

  public showValidations(fields: string[]) {
    const MODAL_REF: BsModalRef = this.modalService.show (ValidationsModalComponent);
    MODAL_REF.content.fields = fields;
  }

  public showNewMeetingSchedule() {
    const MODAL_REF: BsModalRef = this.modalService.show (MeetingSchedulesFormComponent);
    return (MODAL_REF.content as MeetingSchedulesFormComponent).confirmResult;
  }

  public showNewReport(schedule: MeetingScheduleDTO) {
    const MODAL_REF: BsModalRef = this.modalService.show (ReportsFormComponent);
    MODAL_REF.content.schedule = schedule;
    return (MODAL_REF.content as ReportsFormComponent).confirmResult;
  }

  public showSchoolClass(course: CourseDTO) {
    const MODAL_REF: BsModalRef = this.modalService.show (SchoolClassesListComponent);
    MODAL_REF.content.course = course;
    MODAL_REF.setClass ('modal-lg');
  }

  public showWaitModal(): BsModalRef {
    const MODAL_REF: BsModalRef = this.modalService.show (WaitModalComponent);
    return MODAL_REF;
  }

  public showNewCourse() {
    const MODAL_REF: BsModalRef = this.modalService.show (CoursesFormComponent);
    return (MODAL_REF.content as CoursesFormComponent).confirmResult;
  }

  public showNewSchoolClass(course: CourseDTO) {
    const MODAL_REF: BsModalRef = this.modalService.show (SchoolClassesFormComponent);
    console.log ('course', course);
    MODAL_REF.content.course = course;
    return (MODAL_REF.content as SchoolClassesFormComponent).confirmResult;
  }

  public hideModal(modalRef: BsModalRef) {
    if (modalRef != null) {
      modalRef.hide ();
    }
  }
}
