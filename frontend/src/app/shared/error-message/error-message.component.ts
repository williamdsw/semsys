import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidators } from '../utils/form-validators';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {

  // FIELDS

  @Input() public control: FormControl;
  @Input() public label: string;

  // CONSTRUCTOR

  constructor(private translate: TranslatePipe) { }

  // HELPER FUNCTIONS

  public get errorMessages() {

    for (const PROPERTY_NAME in this.control.errors) {
      if (this.control.errors.hasOwnProperty(PROPERTY_NAME) && this.control.dirty) {
        return FormValidators.getErrorMessage(this.label, PROPERTY_NAME, this.control.errors[PROPERTY_NAME]);
      }
    }
    return null;
  }
}
