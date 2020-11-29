import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import pL from 'js-regex-pl';


/**
 * Accepts String with password characteristics
 *
 * @param control - AbstractControl to validate
 */
export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const errorObj: Record<string, boolean> = {};

    const atLeastLengthEightRegex = new RegExp(/^.{8,}$/);
    const atLeastOneDigitRegex = new RegExp(/^.*\d.*$/);
    const atLeastOneCharacterRegex = new RegExp(/^.*[a-zA-Z].*$/);
    const atLeastOneSpecialCharacterRegex = new RegExp(/^.*[!"#$%&'()*,\-./:;<>?@\[\]^_`{|}~\\´].*$/);
    const noWhiteSpaceCharacters = new RegExp(/^[^\s]+$/);

    if (!atLeastLengthEightRegex.test(control.value)) {
        errorObj.lessThanEight = true;
    }

    if (!atLeastOneDigitRegex.test(control.value)) {
        errorObj.atLeastOneDigit = true;
    }

    if (!atLeastOneCharacterRegex.test(control.value)) {
        errorObj.atLeastOneChar = true;
    }

    if (!atLeastOneSpecialCharacterRegex.test(control.value)) {
        errorObj.atLeastOneSpecialChar = true;
    }

    if (!noWhiteSpaceCharacters.test(control.value)) {
        errorObj.noWhiteSpace = true;
    }

    return Object.keys(errorObj).length === 0 ? null : errorObj;
};

/**
 * Checks if two password FormControl values match
 *
 * @param control - AbstractControl to validate
 */
export const passwordConfirmationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
    return password.value === passwordConfirmation.value ? null : {error: 'passwords not equal'};
};

/**
 * Checks if email matches email regex, which expects:
 *
 * - any number of characters, digits, or '.' before '@' symbol
 * - one '@' symbol
 * - at least two, maximum 10 characters or digits after '@' symbol
 * - at least one '.' after '@'
 * - at least two, maximum 10 characters or digits after last '.'
 *
 */
export const customEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = new RegExp(/(^[\w.+-]+@([\w-]{2,30}\.)+[\w-]{2,10}$)/);
    return emailRegex.test(control.value) ? null : {error: 'pattern not matched'};
};

export const nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const nameRegex = new RegExp(`^([${pL}]+[ -]?)+$`);
    return nameRegex.test(control.value) ? null : {error: 'pattern not matched'};
};

export const dayValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const val = parseInt(control.value, 10);
    return (val > 0 && val <= 31) ? null : {error: 'pattern not matched'};
};

export const monthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const val = parseInt(control.value, 10);
    return (val > 0 && val <= 12) ? null : {error: 'pattern not matched'};
};

export const yearValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const val = parseInt(control.value, 10);
    return (val > 1900 && val <= 2030) ? null : {error: 'pattern not matched'};
};

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let ret = true;
    if (control.value) {
        const dateRegex = new RegExp(/^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g);
        const dateArr = control.value.split('.');
        const dateFormatted = `${('0' + dateArr[0]).slice(-2)}.${('0' + dateArr[1]).slice(-2)}.${dateArr[2]}`;
        ret = dateRegex.test(dateFormatted);
    }
    return ret ? null : {error: 'pattern not matched'};
};

export const birthdayValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const day = parseInt(control.get('birthdayDay').value, 10);
    const month = parseInt(control.get('birthdayMonth').value, 10);
    const year = parseInt(control.get('birthdayYear').value, 10);

    const dateRegex = new RegExp(/^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g);
    const dateFormatted = `${('0' + day).slice(-2)}.${('0' + month).slice(-2)}.${year}`;
    return dateRegex.test(dateFormatted) ? null : {error: 'pattern not matched'};
};

