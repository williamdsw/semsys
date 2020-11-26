import { FormControl, FormGroup } from '@angular/forms';

export class FormValidators {

    // HELPER FUNCTIONS

    public static equalsTo(otherField: string) {

        const VALIDATOR = (formControl: FormControl) => {

            if (otherField == null ) {
                throw new Error ('Other field is required!');
            }

            const ROOT = (formControl.root as FormGroup);
            if (!formControl.root || !ROOT.controls) {
                return null;
            }

            const FIELD = ROOT.get (otherField);
            if (!FIELD) {
                throw new Error ('A valid field is required!');
            }

            if (FIELD.value !== formControl.value) {
                return { equalsTo: otherField };
            }

            return null;
        };

        return VALIDATOR;
    }

    public static zipCode(control: FormControl) {

        const ZIP_CODE = control.value;
        if (ZIP_CODE && ZIP_CODE !== '') {
            const VALIDATOR = /^[0-9]{5}(?:-[0-9]{4})?$/;
            return VALIDATOR.test (ZIP_CODE) ? null : { invalidZipCode: true };
        }

        return null;
    }

    public static getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {
        const CONFIG = {
            required: `This field is required!`,
            minlength: `Minimum length is ${validatorValue.requiredLength} characters.`,
            maxlength: `Maximum length is ${validatorValue.requiredLength} characters.`,
            email: 'Email is invalid!',
            equalsTo: `${fieldName} are not equals!`,
        };

        return CONFIG[validatorName];
    }
}
