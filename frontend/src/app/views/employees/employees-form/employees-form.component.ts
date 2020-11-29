import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { ModalService } from 'src/app/services/modal.service';
import { ZipCodeService } from 'src/app/services/zip-code.service';
import { EmployeeService } from 'src/app/services/domain/employee.service';
import { CountryService } from 'src/app/services/domain/country.service';
import { StateService } from 'src/app/services/domain/state.service';
import { CityService } from 'src/app/services/domain/city.service';
import { StorageService } from 'src/app/services/storage.service';
import { PersonService } from 'src/app/services/domain/person.service';

import { EmployeeNewDTO } from 'src/app/models/domain/new-dto/employee.new.dto';

import { PersonsFormComponent } from '../../persons/persons-form.component';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styles: ['.box-wrapper { width: 60rem; }']
})
export class EmployeesFormComponent extends PersonsFormComponent<EmployeeNewDTO> implements OnInit, OnDestroy {

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected modalService: ModalService,
    protected zipCodeService: ZipCodeService,
    protected employeeService: EmployeeService,
    protected countryService: CountryService,
    protected stateService: StateService,
    protected cityService: CityService,
    protected personService: PersonService
  ) {
    super(translateService, storageService, formBuilder, router,
          modalService, zipCodeService, countryService, stateService,
          cityService, personService);

    this.model = new EmployeeNewDTO();
    this.showModal = true;
  }

  ngOnInit(): void {
    super.ngOnInit ();
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

    this.model = Object.assign (this.model, this.form.value) as EmployeeNewDTO;
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
      this.subscription$ = this.employeeService.insertEmployee (this.model).subscribe (
        () => {
          this.modalService.hideModal(waitModal);
          this.modalService.showAlertSuccess ('modal.titles.success', 'modal.messages.post-success');
          this.resetForm ();
        },
        () => {
          this.modalService.hideModal(waitModal);
          this.modalService.showAlertDanger ('modal.titles.error', 'modal.messages.post-error');
        }
      );
    }, 500);
  }

  protected showValidationModal(currentForm: FormGroup): void {
    super.showValidationModal (currentForm);
  }
}
