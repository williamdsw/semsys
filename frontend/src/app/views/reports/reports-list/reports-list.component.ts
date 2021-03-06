import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';
import { ReportService } from 'src/app/services/domain/report.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { ReportDTO } from 'src/app/models/domain/dto/report.dto';
import { EmployeeDTO } from 'src/app/models/domain/dto/employee.dto';
import { StudentDTO } from 'src/app/models/domain/dto/student.dto';
import { MeetingScheduleDTO } from 'src/app/models/domain/dto/meeting-schedule.dto';
import { ReportDetails } from 'src/app/models/report-detail';

import { BaseTableComponent } from 'src/app/shared/list-table/base-table/base-table.component';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
})
export class ReportsListComponent extends BaseTableComponent<ReportDTO> implements OnInit {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected modalService: ModalService,
    private reportService: ReportService,
    private authenticationService: AuthenticationService,
  ) {
    super(translateService, storageService, modalService);

    // default values
    this.globalHeader = 'global.menu-links.my-reports';
    this.tableHeaders = [
      '#', 'report.emission', 'report.written-by', 'report.about', 'report.information'
    ];

    Object.assign (this._localUser, storageService.getLocalUser ());
  }

  ngOnInit(): void {
    this.records$ = this.loadData ();
  }

  public onUpdate(): void {}
  public onDelete(): void {}
  public onReload(): void {
    this.hasError = false;
    this.records$ = this.loadData();
  }

  protected loadData(): Observable<any> {

    if (this._localUser.getType () === 'Employee') {
      return this.pipeFindAll (this.reportService.findAllByEmployee (this._localUser.getId ()));
    }
    else if (this._localUser.getType() === 'Student') {
      return this.pipeFindAll (this.reportService.findAllByStudent (this._localUser.getId ()));
    }
  }

  protected pipeFindAll(observable: Observable<any>): Observable<any> {
    return observable.pipe (
      map (reports => {
        return reports.map(report => {
          this.hasError = false;

          let dto = new ReportDTO ();
          let schedule = new MeetingScheduleDTO ();
          let employee = new EmployeeDTO ();
          let student = new StudentDTO ();

          dto = Object.assign (dto, report);
          schedule = Object.assign (schedule, dto.getSchedule ());
          employee = Object.assign (employee, schedule.getEmployee ());
          student = Object.assign (student, schedule.getStudent ());

          schedule.setEmployee (employee);
          schedule.setStudent (student);
          dto.setSchedule (schedule);

          return dto;
        });
      }),

      catchError(() => {
        this.hasError = true;
        this.error$.next (true);
        this.handleError (this.modalTexts.error.title, this.modalTexts.loading.body);
        return EMPTY;
      })
    );
  }

  public showDetailModal(report: ReportDTO): void {
    const employeeName = report.getSchedule ().getEmployee ().getName ();
    const studentName = report.getSchedule().getStudent().getName();
    this.modalService.showReportDetails (employeeName, studentName, report.getTitle (), report.getContent (), report.getEmission ());
  }

  public containsProfile(profile: string) {
    return this.authenticationService.containsProfile (profile);
  }
}
