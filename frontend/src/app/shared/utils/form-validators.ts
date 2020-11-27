import { FormControl, FormGroup } from '@angular/forms';

export class FormValidators {

    // HELPER FUNCTIONS

    public static equalsTo(otherField: string): object {

        const validator = (formControl: FormControl) => {

            if (otherField == null ) {
                throw new Error ('Other field is required!');
            }

            const root = (formControl.root as FormGroup);
            if (!formControl.root || !root.controls) {
                return null;
            }

            const field = root.get (otherField);
            if (!field) {
                throw new Error ('A valid field is required!');
            }

            if (field.value !== formControl.value) {
                return { equalsTo: otherField };
            }

            return null;
        };

        return validator;
    }

    public static zipCode(control: FormControl): object {

        const zipCode = control.value;
        if (zipCode && zipCode !== '') {
            const validator = /^[0-9]{5}(?:-[0-9]{4})?$/;
            return validator.test (zipCode) ? null : { invalidZipCode: true };
        }

        return null;
    }

    public static getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any): any {
        const config = {
            required: `This field is required!`,
            minlength: `Minimum length is ${validatorValue.requiredLength} characters.`,
            maxlength: `Maximum length is ${validatorValue.requiredLength} characters.`,
            email: 'Email is invalid!',
            equalsTo: `${fieldName} are not equals!`,
        };

        return config[validatorName];
    }
}
