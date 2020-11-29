import { Component, OnInit } from '@angular/core';
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

  public currentFilter = 'all';
  public timePeriods: string[] = [];
  public periodDescriptions: string[] = [];
  public isSelected = false;

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
    this.tableHeaders = [
      '', 'global.personal.name', 'course.period.period', 'course.type.type'
    ];
    this.timePeriods = this.courseService.listTimePeriods ();
    this.periodDescriptions = this.courseService.getPeriodDescriptions ();
  }

  ngOnInit(): void {
    this.onReload ();
  }

  public onUpdate(): void {}
  public onReload(): void {
    this.hasError = false;
    this.records$ = this.loadData('ALL');
  }

  public onDelete(): void {
    const result$ = this.modalService.showConfirm (this.modalTexts.confirm.title, this.modalTexts.confirm.body);
    result$.asObservable ().pipe (
      take (1),
      switchMap (result => {
        return (result ? this.courseService.deleteCourse (this.selectedModel.getId ()) : EMPTY);
      })
    ).subscribe (
      () => {
        this.isSelected = false;
        this.records$ = this.loadData('ALL');
        this.modalService.showAlertSuccess (this.modalTexts.success.title, this.modalTexts.success.body);
      },
      () => this.modalService.showAlertDanger (this.modalTexts.error.title, this.modalTexts.error.body),
      () => result$.unsubscribe ()
    );
  }

  protected loadData(filter?: string, value?: string): Observable<CourseDTO[]> {
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

  protected pipeFindAll(observable: Observable<any>): Observable<CourseDTO[]> {
    return observable.pipe (
      map ((courses: CourseDTO[]) => {
        return courses.map ((course) => {
          this.hasError = false;
          let dto = new CourseDTO ();
          dto = Object.assign (dto, course);
          return dto;
        });
      }),

      catchError (() => {
        this.hasError = true;
        this.error$.next (true);
        this.handleError (this.modalTexts.error.title, this.modalTexts.loading.body);
        return EMPTY;
      })
    ) as Observable<CourseDTO[]>;
  }

  public toggleButtons(course: CourseDTO): void {
    this.selectedModel = course;
    this.isSelected = true;
  }

  public toggleFilter(filter: string, value?: string): void {
    this.currentFilter = filter;
    value = (filter === 'period' && value === '' ? 'Morning' : value);
    this.records$ = this.loadData (filter, value);
  }

  public showSchoolClasses(course: CourseDTO): void {
    this.modalService.showSchoolClass (course);
  }

  public showNewCourseModal(): void {
    const result$ = this.modalService.showNewCourse ();
    result$.asObservable ().pipe (take (1)).subscribe (
      (result: boolean) => {
        if (result) {
          this.modalService.showAlertSuccess (this.modalTexts.success.title, 'course.messages.course-success');
          this.records$ = this.loadData();
        } else {
          this.modalService.showAlertDanger (this.modalTexts.error.title, 'course.messages.course-error');
        }
      },
      () => this.modalService.showAlertDanger (this.modalTexts.error.title, 'course.messages.course-error'),
      () => result$.unsubscribe ()
    );
  }

  public showNewSchoolClass(course: CourseDTO): void {
    const result$ = this.modalService.showNewSchoolClass (course);
    result$.asObservable ().subscribe (
      (result: boolean) => {
        if (result) {
          this.modalService.showAlertSuccess (this.modalTexts.success.title, 'classes.messages.class-success');
        } else {
          this.modalService.showAlertDanger (this.modalTexts.error.title, 'classes.messages.class-error');
        }
      },
      () => this.modalService.showAlertDanger (this.modalTexts.error.title, 'classes.messages.class-error'),
      () => result$.unsubscribe ()
    );
  }

  public getTranslatedPeriod(period: string): string {
    return this.courseService.getTranslatedPeriod (period);
  }

  public getTranslatedCourseType(type: string): string {
    return this.courseService.getTranslatedCourseType (type);
  }

  public containsProfile(profile: string): boolean {
    return this.authenticationService.containsProfile (profile);
  }
}
