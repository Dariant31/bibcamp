import { AbstractControl, FormGroup } from '@angular/forms';

export const ClassValidator = {
    checkFormDirtyAndValid(control: AbstractControl): string {
        if (control.dirty) {
            return control.valid ? 'is-valid' : 'has-error';
        }
        return '';
    },

    checkPasswordConfirmDirtyAndValid(formGroup: FormGroup): string {
        if (formGroup.controls.passwordConfirmation.dirty) {
            if (formGroup.controls.password.value === formGroup.controls.passwordConfirmation.value) {
                return (formGroup.controls.passwordConfirmation.valid && formGroup.controls.password.valid) ?
                    'is-valid' : 'has-error';
            }
        }
        return '';
    }
};
