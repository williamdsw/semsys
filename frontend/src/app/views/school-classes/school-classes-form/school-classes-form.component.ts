import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SchoolClassNewDTO } from 'src/app/models/domain/school-class.new.dto';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SchoolClassService } from 'src/app/services/domain/school-class.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CourseDTO } from 'src/app/models/domain/course.dto';
import { BsCustomDatesViewComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-custom-dates-view.component';

@Component({
  selector: 'app-school-classes-form',
  templateUrl: './school-classes-form.component.html'
})
export class SchoolClassesFormComponent extends BaseFormComponent<SchoolClassNewDTO> implements OnInit, OnDestroy {

  // FIELDS

  public confirmResult: Subject<boolean>;
  public todayDate: Date = new Date ();
  public bsDateConfig = { isAnimated: true };
  public currentCourse: CourseDTO = new CourseDTO ();
  public errorMessage: string;

  @Input('course') public set course(localCourse: CourseDTO) {
    this.currentCourse = localCourse;
    this.form.patchValue ({
      name: this.buildSchoolClassName (),
      courseId: this.currentCourse.getId ()
    });
  }

  // CONSTRUCTOR

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

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe ();
  }

  // OVERRIDED FUNCTIONS

  protected showValidationModal(form: any) {}
  protected submit() {
    this.errorMessage = '';
    this.model = Object.assign (this.model, this.form.value) as SchoolClassNewDTO;

    const START = this.model.getStart ();
    const END = this.model.getEnd ();

    if (START > END) {
      this.errorMessage = 'classes.messages.start-greater-than-end';
      return;
    }

    this.subscription = this.schoolClassService.insertSchoolClass (this.model).subscribe (
      response => {
        if (response !== null && response.hasOwnProperty ('error')) {
          this.confirmAndClose (false);
          return;
        }

        this.confirmAndClose (true);
      },
      error => {
        console.log (error);
        this.confirmAndClose (false);
      }
    );
  }

  // HELPER FUNCTIONS

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      courseId: [null, [Validators.required]]
    });

    return this.form;
  }

  private confirmAndClose(value?: boolean) {
    this.modalRef.hide ();

    if (value != null) {
      this.confirmResult.next (value);
    }
  }

  public onClose(): void {
    this.confirmAndClose (null);
  }

  private buildSchoolClassName() {
    let schoolClassName = '';
    const COURSE_NAME = this.currentCourse.getName ();
    const WORDS = COURSE_NAME.split (' ');

    if (WORDS.length >= 2) {
      WORDS.forEach (word => {
        schoolClassName += word.charAt (0).toUpperCase ();
      });
    } else {
      schoolClassName += COURSE_NAME.charAt (0).toUpperCase ();
    }

    schoolClassName = `${schoolClassName} - Class`;

    return schoolClassName;
  }
}
