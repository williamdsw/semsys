import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { CourseDTO } from 'src/app/models/domain/course.dto';
import { CourseNewDTO } from 'src/app/models/domain/course.new.dto';
import { TimePeriod } from 'src/app/enums/time-period.enum';
import { CourseType } from 'src/app/enums/course-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CrudService<CourseDTO | CourseNewDTO> {

  // FIELDS

  private periodDescriptions: string[] = [
    'course.period.morning',
    'course.period.afternoon',
    'course.period.evening'
  ];

  private courseTypeDescriptions: string[] = [
    'course.type.technical-course',
    'course.type.licentiate',
    'course.type.bachelor-degree'
  ];

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  public findAll() {
    return this.listAll (`${environment.API}/v1/public/courses`);
  }

  public findByPeriod(period: string) {
    let params = new HttpParams ();
    params = params.append ('value', period);
    return this.listAll (`${environment.API}/v1/protected/courses/period`, params);
  }

  public findByName(name: string) {
    let params = new HttpParams ();
    params = params.append ('name', name);
    return this.listAll (`${environment.API}/v1/protected/courses/name`, params);
  }

  public insertCourse(course: CourseNewDTO) {
    return this.insert(`${environment.API}/v1/admin/courses`, course);
  }

  public deleteCourse(id: number) {
    return this.delete(`${environment.API}/v1/admin/courses/${id}`);
  }

  public listTimePeriods(): string[] {
    const PERIODS: string[] = [];

    for (const PERIOD in TimePeriod) {
      if (TimePeriod.hasOwnProperty (PERIOD)) {
        PERIODS.push (TimePeriod[PERIOD]);
      }
    }

    return PERIODS;
  }

  public listCourseTypes(): string[] {
    const COURSE_TYPES: string[] = [];

    for (const TYPE in CourseType) {
      if (CourseType.hasOwnProperty (TYPE)) {
        COURSE_TYPES.push (CourseType[TYPE]);
      }
    }

    return COURSE_TYPES;
  }

  public getPeriodDescriptions() {
    return this.periodDescriptions;
  }

  public getCourseTypeDescriptions() {
    return this.courseTypeDescriptions;
  }

  public getTranslatedPeriod(period: string) {
    const KEY = `course.period.${period.toLowerCase ()}`;
    const INDEX = this.periodDescriptions.indexOf (KEY);
    return this.periodDescriptions[INDEX];
  }

  public getTranslatedCourseType(type: string) {
    type = type.replace (' ', '-');
    const KEY = `course.type.${type.toLowerCase ()}`;
    const INDEX = this.courseTypeDescriptions.indexOf (KEY);
    return this.courseTypeDescriptions[INDEX];
  }
}
