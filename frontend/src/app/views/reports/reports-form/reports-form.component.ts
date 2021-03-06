import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { TranslateService } from '@ngx-translate/core';
import { ReportService } from 'src/app/services/domain/report.service';
import { StorageService } from 'src/app/services/storage.service';

import { ReportDTO } from 'src/app/models/domain/dto/report.dto';
import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';
import { MeetingScheduleDTO } from 'src/app/models/domain/dto/meeting-schedule.dto';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.component.html',
})
export class ReportsFormComponent extends BaseFormComponent<ReportDTO> implements OnInit, OnDestroy {

  public employee: EmployeeDTO = new EmployeeDTO();
  public student: StudentDTO = new StudentDTO();
  public confirmResult: Subject<boolean>;

  @Input() public set schedule(localSchedule: MeetingScheduleDTO) {
    this.employee = localSchedule.getEmployee ();
    this.student = localSchedule.getStudent ();
    this.form.patchValue ({
      schedule: {
        id: localSchedule.getId (),
        employeeId: this.employee.getId (),
        studentId: this.student.getId ()
      }
    });
  }

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    private reportService: ReportService,
    private modalRef: BsModalRef
  ) {
    super(translateService, storageService, formBuilder);

    this.model = new ReportDTO();
    this.showModal = false;
    this.confirmResult = new Subject();
  }

  ngOnInit(): void {
    this.form = this.buildForm ();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  protected showValidationModal(form: any): void {}
  protected submit(): void {
    this.model = Object.assign (this.model, this.form.value) as ReportDTO;
    this.subscription$ = this.reportService.insertReport (this.model).subscribe (
      () => this.confirmAndClose (true),
      () => this.confirmAndClose (false)
    );
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group ({
      id: [null],
      title: [null, [Validators.required, Validators.minLength (5), Validators.maxLength (30)]],
      content: [null, [Validators.required, Validators.minLength (10), Validators.maxLength (1000)]],
      schedule: this.formBuilder.group ({
        id: [null, [Validators.required]],
        employeeId: [null, [Validators.required]],
        studentId: [null, [Validators.required]],
      })
    });
  }

  private confirmAndClose(value: boolean): void {
    this.modalRef.hide();

    if (value !== null) {
      this.confirmResult.next (value);
    }
  }

  public onClose(): void {
    this.confirmAndClose (null);
  }
}
