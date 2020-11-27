import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { CrudService } from 'src/app/services/crud.service';

import { TimePeriod } from 'src/app/enums/time-period.enum';
import { CourseType } from 'src/app/enums/course-type.enum';

import { CourseDTO } from 'src/app/models/domain/dto/course.dto';
import { CourseNewDTO } from 'src/app/models/domain/new-dto/course.new.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CrudService<CourseDTO | CourseNewDTO> {

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

  private publicUrl: string;
  private _protectedUrl: string;
  private adminUrl: string;

  public get protectedUrl() {
    return this._protectedUrl;
  }

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.publicUrl = `${environment.API}/v1/public/courses`;
    this._protectedUrl = `${environment.API}/v1/protected/courses`;
    this.adminUrl = `${environment.API}/v1/admin/courses`;
  }

  public findAll(): Observable<(CourseDTO | CourseNewDTO)[]> {
    return this.listAll(this.publicUrl);
  }

  public findByKeyAndValueWhereUrlIs(key: string, value: string, url: string):
        Observable<(CourseDTO | CourseNewDTO)[]> {
    let params = new HttpParams();
    params = params.append(key, value);
    return this.listAll(url, params);
  }

  public insertCourse(course: CourseNewDTO): Observable<object> {
    return this.insert(this.adminUrl, course);
  }

  public deleteCourse(id: number): Observable<object> {
    return this.delete(`${this.adminUrl}/${id}`);
  }

  public listTimePeriods(): string[] {
    const periods: string[] = [];

    for (const value in TimePeriod) {
      if (TimePeriod.hasOwnProperty (value)) {
        periods.push (TimePeriod[value]);
      }
    }

    return periods;
  }

  public listCourseTypes(): string[] {
    const courseTypes: string[] = [];

    for (const value in CourseType) {
      if (CourseType.hasOwnProperty (value)) {
        courseTypes.push (CourseType[value]);
      }
    }

    return courseTypes;
  }

  public getPeriodDescriptions(): string[] {
    return this.periodDescriptions;
  }

  public getCourseTypeDescriptions(): string[] {
    return this.courseTypeDescriptions;
  }

  public getTranslatedPeriod(period: string): string {
    const key = `course.period.${period.toLowerCase ()}`;
    const index = this.periodDescriptions.indexOf (key);
    return this.periodDescriptions[index];
  }

  public getTranslatedCourseType(type: string): string {
    if (!type || type === '') {
      return null;
    }

    type = type.replace (' ', '-');
    const key = `course.type.${type.toLowerCase ()}`;
    const index = this.courseTypeDescriptions.indexOf (key);
    return this.courseTypeDescriptions[index];
  }
}
