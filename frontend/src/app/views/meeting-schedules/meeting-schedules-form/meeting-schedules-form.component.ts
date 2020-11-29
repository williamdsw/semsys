import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'src/app/services/domain/employee.service';
import { StudentService } from 'src/app/services/domain/student.service';
import { StorageService } from 'src/app/services/storage.service';
import { MeetingScheduleService } from 'src/app/services/domain/meeting-schedule.service';

import { MeetingScheduleNewDTO } from 'src/app/models/domain/new-dto/meeting-schedule.new.dto';
import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';
import { LocalUser } from 'src/app/models/local-user';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-meeting-schedules-form',
  templateUrl: './meeting-schedules-form.component.html',
})
export class MeetingSchedulesFormComponent extends BaseFormComponent<MeetingScheduleNewDTO> implements OnInit, OnDestroy {

  public employees: EmployeeDTO[] = [];
  public students: StudentDTO[] = [];
  public userType: string;
  public currentUserIndex: number;
  private localUser = new LocalUser();
  public confirmResult: Subject<boolean>;
  public todayDate = new Date ();

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private studentService: StudentService,
    private meetingScheduleService: MeetingScheduleService,
    private modalRef: BsModalRef,
  ) {
    super(translateService, storageService, formBuilder);

    this.model = new MeetingScheduleNewDTO ();
    this.showModal = false;
    this.confirmResult = new Subject ();
    this.userType = 'Employee';

    Object.assign(this.localUser, storageService.getLocalUser());
    this.userType = this.localUser.getType();
  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadEmployees();
    this.form = this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected showValidationModal(form: any): void {}
  protected submit(): void {
    this.model = Object.assign (this.model, this.form.value) as MeetingScheduleNewDTO;
    this.subscription$ = this.meetingScheduleService.insertMeetingSchedule (this.model).subscribe (
      (response) => {
        if (response && response.hasOwnProperty ('error')) {
          this.confirmAndClose (false);
          return;
        }

        this.confirmAndClose (true);
      },
      () => this.confirmAndClose (false)
    );
  }

  private loadEmployees(): void {
    this.subscription$ = this.employeeService.findAllEmployees().subscribe(
      (emps: EmployeeDTO[]) => {
        emps.map(employee => {
          let dto = new EmployeeDTO();
          dto = Object.assign(dto, employee);
          this.employees.push(dto);
        });

        if (this.userType === 'Employee') {
          this.currentUserIndex = this.employees.findIndex (e => e.getId () === this.localUser.getId ());
        }
      },
      () => this.employees = []
    );
  }

  private loadStudents(): void {
    this.subscription$ = this.studentService.findAllStudents().subscribe(
      (studs: StudentDTO[]) => {
        studs.map(student => {
          let dto = new StudentDTO();
          dto = Object.assign(dto, student);
          this.students.push(dto);
        });

        if (this.userType === 'Student') {
          this.currentUserIndex = this.students.findIndex (student => student.getId () === this.localUser.getId ());
        }
      },
      () => this.students = []
    );
  }

  private buildForm(): FormGroup {
    this.form = this.formBuilder.group({
      id: [null],
      datetime: [this.todayDate.toISOString ().slice (0, 16), [Validators.required]],
      employeeId: [null, [Validators.required]],
      studentId: [null, [Validators.required]],
    });

    if (this.userType === 'Employee') {
      this.form.patchValue({ employeeId: this.localUser.getId() });
    }
    else if (this.userType === 'Student') {
      this.form.patchValue({ studentId: this.localUser.getId() });
    }

    return this.form;
  }

  private confirmAndClose(value?: boolean): void {
    this.modalRef.hide ();

    if (value != null) {
      this.confirmResult.next (value);
    }
  }

  public onClose(): void {
    this.confirmAndClose (null);
  }
}
