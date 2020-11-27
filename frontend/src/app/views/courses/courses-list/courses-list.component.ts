import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError, take, switchMap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/services/modal.service';
import { StorageService } from 'src/app/services/storage.service';
import { CourseService } from 'src/app/services/domain/course.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { CourseDTO } from 'src/app/models/domain/dto/course.dto';

import { BaseTableComponent } from 'src/app/shared/list-table/base-table/base-table.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styles: ['.table-box { width: 120rem; }', '.container { max-width: 1200px; }']
})
export class CoursesListComponent extends BaseTableComponent<CourseDTO> implements OnInit {

  // FIELDS

  public currentFilter = 'all';
  public timePeriods: string[] = [];
  public periodDescriptions: string[] = [];
  public isSelected = false;

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected modalService: ModalService,
    protected storageService: StorageService,
    private courseService: CourseService,
    private authenticationService: AuthenticationService,
  ) {
    super(translateService, storageService, modalService);

    // default values
    this.globalHeader = 'global.menu-links.courses';
    this.confirmBody = 'course.messages.confirmation';
    this.tableHeaders = ['', 'global.personal.name', 'course.period.period', 'course.type.type'];
    this.timePeriods = this.courseService.listTimePeriods ();
    this.periodDescriptions = this.courseService.getPeriodDescriptions ();
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.onReload ();
  }

  // OVERRIDED FUNCTIONS

  public onUpdate(): void {}
  public onReload(): void {
    this.hasError = false;
    this.records$ = this.loadData('ALL');
  }

  public onDelete() {
    const RESULT$ = this.modalService.showConfirm (this.confirmTitle, this.confirmBody);
    RESULT$.asObservable ().pipe (
      take (1),
      switchMap (result => {
        return (result ? this.courseService.deleteCourse (this.selectedModel.getId ()) : EMPTY);
      })
    ).subscribe (
      success => {
        this.isSelected = false;
        this.records$ = this.loadData('ALL');
        this.modalService.showAlertSuccess (this.successTitle, this.successMessage);
      },
      error => this.modalService.showAlertDanger (this.errorTitle, this.errorMessage),
      () => RESULT$.unsubscribe ()
    );
  }

  protected loadData(filter?: string, value?: string) {

    switch (filter) {
      case 'period': {
        const url = this.courseService.protectedUrl + '/period';
        return this.pipeFindAll(this.courseService.findByKeyAndValueWhereUrlIs('value', value, url));
      }

      case 'name': {
        const url = this.courseService.protectedUrl + '/name';
        return this.pipeFindAll(this.courseService.findByKeyAndValueWhereUrlIs('name', value, url));
      }

      case 'all': default: {
        return this.pipeFindAll (this.courseService.findAll ());
      }
    }
  }

  protected pipeFindAll(observable: Observable<any>) {
    return observable.pipe (
      map ((courses: CourseDTO[]) => {
        return courses.map ((course) => {
          this.hasError = false;
          let dto = new CourseDTO ();
          dto = Object.assign (dto, course);
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
    ) as Observable<CourseDTO[]>;
  }

  // HELPER FUNCTIONS

  public toggleButtons(course: CourseDTO) {
    this.selectedModel = course;
    this.isSelected = true;
  }

  public toggleFilter(filter: string, value?: string) {
    this.currentFilter = filter;
    value = (filter === 'period' && value === '' ? 'Morning' : value);
    this.records$ = this.loadData (filter, value);
  }

  public showSchoolClasses(course: CourseDTO) {
    this.modalService.showSchoolClass (course);
  }

  public showNewCourseModal() {
    const RESULT$ = this.modalService.showNewCourse ();
    RESULT$.asObservable ().pipe (take (1)).subscribe (
      (result: boolean) => {
        console.log ('result course', result);
        if (result) {
          this.modalService.showAlertSuccess ('modal.titles.success', 'course.messages.course-success');
          this.records$ = this.loadData();
        } else {
          this.modalService.showAlertDanger ('modal.titles.error', 'course.messages.course-error');
        }
      },
      error => this.modalService.showAlertDanger ('modal.titles.error', 'course.messages.course-error'),
      () => RESULT$.unsubscribe ()
    );
  }

  public showNewSchoolClass(course: CourseDTO) {
    const RESULT$ = this.modalService.showNewSchoolClass (course);
    RESULT$.asObservable ().subscribe (
      (result: boolean) => {
        console.log ('result class', result);
        if (result) {
          this.modalService.showAlertSuccess ('modal.titles.success', 'classes.messages.class-success');
        } else {
          this.modalService.showAlertDanger ('modal.titles.error', 'classes.messages.class-error');
        }
      },
      error => this.modalService.showAlertDanger ('modal.titles.error', 'classes.messages.class-error'),
      () => RESULT$.unsubscribe ()
    );
  }

  public getTranslatedPeriod(period: string) {
    return this.courseService.getTranslatedPeriod (period);
  }

  public getTranslatedCourseType(type: string) {
    return this.courseService.getTranslatedCourseType (type);
  }

  public containsProfile(profile: string): boolean {
    return this.authenticationService.containsProfile (profile);
  }
}
