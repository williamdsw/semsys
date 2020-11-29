import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { SchoolClassNewDTO } from 'src/app/models/domain/new-dto/school-class.new.dto';
import { CourseDTO } from 'src/app/models/domain/dto/course.dto';

import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import { SchoolClassService } from 'src/app/services/domain/school-class.service';

import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-school-classes-form',
  templateUrl: './school-classes-form.component.html'
})
export class SchoolClassesFormComponent extends BaseFormComponent<SchoolClassNewDTO> implements OnInit, OnDestroy {

  public confirmResult: Subject<boolean>;
  public todayDate = new Date ();
  public bsDateConfig = { isAnimated: true };
  public currentCourse = new CourseDTO ();
  public errorMessage: string;

  @Input('course') public set course(localCourse: CourseDTO) {
    this.currentCourse = localCourse;
    this.form.patchValue ({
      name: this.buildSchoolClassName (),
      courseId: this.currentCourse.getId ()
    });
  }

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    private modalRef: BsModalRef,
    private schoolClassService: SchoolClassService
  ) {
    super(translateService, storageService, formBuilder);

    this.model = new SchoolClassNewDTO ();
    this.showModal = false;
    this.confirmResult = new Subject();
  }

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  protected showValidationModal(form: any): void {}
  protected submit(): void {
    this.errorMessage = '';
    this.model = Object.assign (this.model, this.form.value) as SchoolClassNewDTO;

    const start = this.model.getStart ();
    const end = this.model.getEnd ();

    if (start > end) {
      this.errorMessage = 'classes.messages.start-greater-than-end';
      return;
    }

    this.subscription$ = this.schoolClassService.insertSchoolClass (this.model).subscribe (
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

  private buildForm(): FormGroup {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      courseId: [null, [Validators.required]]
    });

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

  private buildSchoolClassName(): string {
    const courseName = this.currentCourse.getName ();
    const words = courseName.split(' ');
    let schoolClassName = '';

    if (words.length >= 2) {
      words.forEach (word => schoolClassName += word.charAt (0).toUpperCase ());
    }
    else {
      schoolClassName += courseName.charAt (0).toUpperCase ();
    }

    schoolClassName = `${schoolClassName} - Class`;
    return schoolClassName;
  }
}
