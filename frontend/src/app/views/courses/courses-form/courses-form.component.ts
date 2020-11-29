import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

import { CourseService } from 'src/app/services/domain/course.service';
import { StorageService } from 'src/app/services/storage.service';

import { CourseNewDTO } from 'src/app/models/domain/new-dto/course.new.dto';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html'
})
export class CoursesFormComponent extends BaseFormComponent<CourseNewDTO> implements OnInit, OnDestroy {

  public confirmResult$: Subject<boolean>;
  public timePeriods: string[] = [];
  public courseTypes: string[] = [];
  public periodDescriptions: string[] = [];
  public courseTypeDescriptions: string[] = [];

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    private modalRef: BsModalRef,
    private courseService: CourseService,
  ) {
    super(translateService, storageService, formBuilder);

    this.model = new CourseNewDTO();
    this.showModal = false;
    this.confirmResult$ = new Subject();
    this.timePeriods = this.courseService.listTimePeriods ();
    this.courseTypes = this.courseService.listCourseTypes ();
    this.periodDescriptions = this.courseService.getPeriodDescriptions ();
    this.courseTypeDescriptions = this.courseService.getCourseTypeDescriptions ();
  }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected showValidationModal(form: any): void {}
  protected submit(): void {
    this.model = Object.assign(this.model, this.form.value) as CourseNewDTO;
    this.subscription$ = this.courseService.insertCourse(this.model).subscribe(
      (response) => {
        if (response && response.hasOwnProperty('error')) {
          this.confirmAndClose(false);
          return;
        }

        this.confirmAndClose(true);
      },
      () => this.confirmAndClose(false)
    );
  }

  private buildForm(): FormGroup {
    this.form = this.formBuilder.group ({
      id: [null],
      name: [null, [Validators.required, Validators.minLength (5), Validators.maxLength (120)]],
      period: [null, [Validators.required]],
      type: [null, [Validators.required]]
    });

    return this.form;
  }

  private confirmAndClose(value?: boolean): void {
    this.modalRef.hide ();

    if (value != null) {
      this.confirmResult$.next (value);
    }
  }

  public onClose(): void {
    this.confirmAndClose (null);
  }

  public getTranslatedPeriod(period: string): string {
    return this.courseService.getTranslatedPeriod (period);
  }

  public getTranslatedCourseType(type: string): string {
    return this.courseService.getTranslatedCourseType (type);
  }
}
