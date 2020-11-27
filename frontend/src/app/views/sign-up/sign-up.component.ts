import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/services/modal.service';
import { StudentService } from 'src/app/services/domain/student.service';
import { CountryService } from 'src/app/services/domain/country.service';
import { StateService } from 'src/app/services/domain/state.service';
import { CityService } from 'src/app/services/domain/city.service';
import { CourseService } from 'src/app/services/domain/course.service';
import { SchoolClassService } from 'src/app/services/domain/school-class.service';
import { ZipCodeService } from 'src/app/services/zip-code.service';
import { StorageService } from 'src/app/services/storage.service';
import { PersonService } from 'src/app/services/domain/person.service';

import { StudentNewDTO } from 'src/app/models/domain/new-dto/student.new.dto';
import { CourseDTO } from 'src/app/models/domain/dto/course.dto';
import { SchoolClassDTO } from 'src/app/models/domain/dto/school-class.dto';

import { PersonsFormComponent } from '../persons/persons-form.component';

@Component({
  selector: 'app-students-form',
  templateUrl: './sign-up.component.html',
  styles: ['.box-wrapper { width: 60rem; }']
})
export class SignUpComponent extends PersonsFormComponent<StudentNewDTO> implements OnInit, OnDestroy {

  // FIELDS

  public courses$: Observable<CourseDTO[]>;
  public schoolClasses: SchoolClassDTO[] = [];

  // Date related

  public birthdateMinDate: Date = new Date ();
  public birthdateMaxDate: Date = new Date ();
  public bsDateConfig = { isAnimated: true };

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected modalService: ModalService,
    protected zipCodeService: ZipCodeService,
    protected countryService: CountryService,
    protected stateService: StateService,
    protected cityService: CityService,
    protected personService: PersonService,
    private studentService: StudentService,
    private courseService: CourseService,
    private schoolClassService: SchoolClassService,

  ) {
    super(translateService, storageService, formBuilder, router,
          modalService, zipCodeService, countryService, stateService,
          cityService, personService);

    // default values

    this.model = new StudentNewDTO();
    this.showModal = true;
    this.birthdateMinDate.setFullYear (this.birthdateMinDate.getFullYear () - 60);
    this.birthdateMaxDate.setFullYear (this.birthdateMaxDate.getFullYear () - 15, 11, 30);
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    super.ngOnInit ();

    this.courses$ = this.courseService.findAll().pipe(
      map(courses => {
        return courses.map(course => {
          const DTO = new CourseDTO();
          Object.assign(DTO, course);
          return DTO;
        });
      })
    );

    // other controls
    this.form.addControl ('birthdate', new FormControl (null, [Validators.required]));
    this.form.addControl ('courseId', new FormControl (null, [Validators.required]));
    this.form.addControl ('schoolClassId', new FormControl (null, [Validators.required]));

    this.form.get('courseId').valueChanges.subscribe(
      courseId => {
        if (courseId !== null && courseId !== '') {
          this.schoolClassService.findAllByCourseAndName(courseId, '').subscribe(
            (classes: SchoolClassDTO[]) => {
              this.schoolClasses = classes.map(schoolClass => {
                const DTO = new SchoolClassDTO();
                Object.assign(DTO, schoolClass);
                return DTO;
              });
            },
            error => this.schoolClasses = []
          );
        } else {
          this.schoolClasses = [];
        }
      }
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy ();
  }

  // OVERRIDED FUNCTIONS

  protected submit() {

    if (this.socialSecurityNumberExists) {
      this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.ssn-found');
      return;
    }

    if (this.emailExists) {
      this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.email-found');
      return;
    }

    const WAIT_MODAL = this.modalService.showWaitModal ();

    this.model = Object.assign (this.model, this.form.value) as StudentNewDTO;
    const PHONE_NUMBERS: string[] = [];
    PHONE_NUMBERS.push (this.form.get ('phoneNumbers.phoneNumber0').value);
    const PHONE_NUMBER_1 = this.form.get ('phoneNumbers.phoneNumber1');
    const PHONE_NUMBER_2 = this.form.get ('phoneNumbers.phoneNumber2');

    if (PHONE_NUMBER_1.value !== null && PHONE_NUMBER_1.valid) {
      PHONE_NUMBERS.push (PHONE_NUMBER_1.value);
    }

    if (PHONE_NUMBER_2.value !== null && PHONE_NUMBER_2.valid) {
      PHONE_NUMBERS.push (PHONE_NUMBER_2.value);
    }

    this.model.setPhoneNumbers (PHONE_NUMBERS);
    this.subscription$ = this.studentService.insertStudent (this.model).subscribe (
      success => {
        this.modalService.hideModal (WAIT_MODAL);
        this.modalService.showAlertSuccess ('modal.titles.success', 'modal.messages.post-success');
        this.router.navigate (['/login', { socialSecurityNumber: this.model.getSocialSecurityNumber () }]);
      },
      error => {
        console.log (error);
        this.modalService.hideModal (WAIT_MODAL);
        this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.post-error');
      }
    );
  }

  protected showValidationModal(currentForm: FormGroup) {
    super.showValidationModal (currentForm);
  }

  // HELPER FUNCTIONS

  public onCancel(): void {
    this.router.navigate(['login']);
  }
}
