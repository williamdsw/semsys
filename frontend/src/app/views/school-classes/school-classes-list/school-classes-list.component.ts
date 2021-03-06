import { Component, OnInit, Input } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import { SchoolClassService } from 'src/app/services/domain/school-class.service';

import { SchoolClassDTO } from 'src/app/models/domain/dto/school-class.dto';
import { CourseDTO } from 'src/app/models/domain/dto/course.dto';

import { BaseTranslateComponent } from 'src/app/shared/base-translate/base-translate.component';

@Component({
  selector: 'app-school-classes-list',
  templateUrl: './school-classes-list.component.html',
})
export class SchoolClassesListComponent extends BaseTranslateComponent implements OnInit {

  public tableHeaders: string[] = [
    '#', 'global.personal.name', 'classes.start', 'classes.end'
  ];
  public globalHeader = 'course.classes.classes';
  public records$: Observable<SchoolClassDTO[]>;
  public hasError = false;
  public currentCourse = new CourseDTO ();

  @Input('course') public set course(localCourse: CourseDTO) {
    this.currentCourse = localCourse;
    this.onReload (this.currentCourse, '');
  }

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    private schoolClassService: SchoolClassService,
    private modalRef: BsModalRef,
  ) {
    super(translateService, storageService);
    this.records$ = new Observable();
  }

  ngOnInit(): void {}

  public onUpdate(): void {}
  public onReload(course: CourseDTO, name: string): void {
    this.hasError = false;
    this.records$ = this.loadData(course, name);
  }

  protected loadData(course: CourseDTO, name: string): Observable<SchoolClassDTO[]> {
    return this.pipeFindAll (this.schoolClassService.findAllByCourseAndName (course.getId (), name));
  }

  protected pipeFindAll(observable: Observable<any>): Observable<SchoolClassDTO[]> {
    return observable.pipe (
      map ((schoolClasses: SchoolClassDTO[]) => {
        return schoolClasses.map (schoolClass => {
          let dto = new SchoolClassDTO ();
          dto = Object.assign (dto, schoolClass);
          return dto;
        });
      }),

      catchError (() => {
        this.hasError = true;
        return EMPTY;
      })
    );
  }

  public onClose(): void {
    this.modalRef.hide ();
  }
}
