import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidators } from '../utils/form-validators';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {

  @Input() public control: FormControl;
  @Input() public label: string;

  constructor(private translate: TranslatePipe) { }

  public get errorMessages(): any {
    const errors = this.control.errors;
    for (const propertyName in errors) {
      if (errors.hasOwnProperty(propertyName) && this.control.dirty) {
        const propertyValue = errors[propertyName];
        return FormValidators.getErrorMessage(this.label, propertyName, propertyValue);
      }
    }

    return null;
  }
}
