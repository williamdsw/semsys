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

  public birthdateMinDate = new Date ();
  public birthdateMaxDate = new Date ();
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
            () => this.schoolClasses = []
          );
        }
        else {
          this.schoolClasses = [];
        }
      }
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy ();
  }

  protected submit(): void {

    if (this.socialSecurityNumberExists) {
      this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.ssn-found');
      return;
    }

    if (this.emailExists) {
      this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.email-found');
      return;
    }

    this.model = Object.assign (this.model, this.form.value) as StudentNewDTO;
    const phoneNumbers: string[] = [];
    phoneNumbers.push (this.form.get ('phoneNumbers.phoneNumber0').value);
    const phoneNumber1 = this.form.get ('phoneNumbers.phoneNumber1');
    const phoneNumber2 = this.form.get ('phoneNumbers.phoneNumber2');

    if (phoneNumber1.value !== null && phoneNumber1.valid) {
      phoneNumbers.push (phoneNumber1.value);
    }

    if (phoneNumber2.value !== null && phoneNumber2.valid) {
      phoneNumbers.push (phoneNumber2.value);
    }

    this.model.setPhoneNumbers(phoneNumbers);

    const waitModal = this.modalService.showWaitModal();

    setTimeout(() => {
      this.subscription$ = this.studentService.insertStudent (this.model).subscribe (
        () => {
          this.modalService.hideModal (waitModal);
          this.modalService.showAlertSuccess ('modal.titles.success', 'modal.messages.post-success');
          this.router.navigate (['/login', { socialSecurityNumber: this.model.getSocialSecurityNumber () }]);
        },
        () => {
          this.modalService.hideModal (waitModal);
          this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.post-error');
        }
      );
    }, 500);
  }

  protected showValidationModal(currentForm: FormGroup): void {
    super.showValidationModal (currentForm);
  }
}
