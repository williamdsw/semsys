import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { INPUT_MASKS } from '../utils/input-mask';

import { BaseTranslateComponent } from '../base-translate/base-translate.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent<T> extends BaseTranslateComponent {

  // FIELDS

  public form: FormGroup;
  public wasSubmitted: boolean = false;
  public showModal: boolean = false;
  protected subscription: Subscription;
  public model: T;
  public inputMasks = INPUT_MASKS;

  // CONSTRUCTOR

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    protected router?: Router,
  ) {
    super(translateService, storageService);
    this.subscription = new Subscription();
  }

  // ABSTRACT FUNCTIONS

  protected abstract submit();
  protected abstract showValidationModal(form: any);

  // HELPER FUNCTIONS 

  public onSubmit() {

    this.wasSubmitted = true;

    if (this.form.valid) {
      this.submit();
    }
    else {
      this.checkValidations(this.form);

      if (this.showModal) {
        this.showValidationModal (this.form);
      }
    }
  }

  protected checkValidations(currentForm: FormGroup | FormArray) {
    Object.keys(currentForm.controls).forEach(field => {
      const CONTROL = currentForm.get(field);
      CONTROL.markAsDirty();
      CONTROL.markAsTouched();

      if (CONTROL instanceof FormGroup || CONTROL instanceof FormArray) {
        this.checkValidations(CONTROL);
      }
    });
  }

  public checkIsValid(field: string) {
    const FIELD = this.form.get(field);
    return FIELD.valid;
  }

  public hasError(field: string) {
    return this.form.get(field).errors;
  }

  public getField(field: string): FormArray {
    return this.form.get(field) as FormArray;
  }

  public getFieldProperty(field: string, property: string) {
    return this.form.get(field)[property];
  }

  public getCurrentValueLength(field: string, max: number) {
    const CONTROL = this.form.get(field);

    console.log(max);

    return `${CONTROL.value.length} / ${max} characters long.`
  }

  public resetForm() {
    this.form.reset();
  }

  public buildValidationClass(field: string) {
    return {
      'is-invalid': this.wasSubmitted && this.hasError(field),
      'is-valid': this.wasSubmitted && !this.hasError(field)
    }
  }
}
