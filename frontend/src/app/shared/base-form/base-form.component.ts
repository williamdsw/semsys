import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { INPUT_MASKS } from '../utils/input-mask';

import { StorageService } from 'src/app/services/storage.service';

import { BaseTranslateComponent } from '../base-translate/base-translate.component';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent<T> extends BaseTranslateComponent {

  public form: FormGroup;
  public wasSubmitted = false;
  public showModal = false;
  protected subscription$: Subscription;
  public model: T;
  public inputMasks = INPUT_MASKS;

  constructor(
    protected translateService: TranslateService,
    protected storageService: StorageService,
    protected formBuilder: FormBuilder,
    protected router?: Router,
  ) {
    super(translateService, storageService);
    this.subscription$ = new Subscription();
  }

  protected abstract submit(): void;
  protected abstract showValidationModal(form: any): void;

  public onSubmit(): void {

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

  protected checkValidations(currentForm: FormGroup | FormArray): void {
    Object.keys(currentForm.controls).forEach(field => {
      const control = currentForm.get(field);
      control.markAsDirty();
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkValidations(control);
      }
    });
  }

  public checkIsValid(field: string): boolean {
    const control = this.form.get(field);
    return control ? control.valid : false;
  }

  public hasError(field: string): ValidationErrors {
    const control = this.form.get(field);
    return control ? control.errors : null;
  }

  public getField(field: string): FormArray {
    const control = this.form.get(field);
    return control ? control as FormArray : null;
  }

  public getFieldProperty(field: string, property: string): any {
    const control = this.form.get(field);
    return control ? control[property] : null;
  }

  public getCurrentValueLength(field: string, max: number): string {
    const control = this.form.get(field);
    return control ? `${control.value.length} / ${max}.` : '';
  }

  public resetForm(): void {
    this.form.reset();
  }

  public buildValidationClass(field: string): object {
    return {
      'is-invalid': this.wasSubmitted && this.hasError(field),
      'is-valid': this.wasSubmitted && !this.hasError(field)
    };
  }
}
