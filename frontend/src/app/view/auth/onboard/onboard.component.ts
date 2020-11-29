import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorStateMatcherUtils} from '@app/shared/utils/error-matcher.utils';
import {customEmailValidator, passwordConfirmationValidator, passwordValidator} from '@app/shared/form-validator/custom.validator';
import {ClassValidator} from '@app/shared/form-validator/class.validator';
import {AuthState} from '@app/view/auth/_store/auth.state';
import {Store} from '@ngrx/store';
import {AuthActions} from '@app/view/auth/_store/auth.actions';
import {selectIsLoading,} from '@app/shared/_store/shared.selector';
import {SharedActions} from '@app/shared/_store/shared.actions';
import {GeneralUtils} from '@app/shared/utils/general.utils';
import {LoginDto, RegisterDto} from '@api/schemas';
import {selectIsRegistered} from '@app/view/auth/_store/auth.selector';
import {AuthUtils} from '@app/shared/utils/auth.utils';
import {SharedState} from '@app/shared/_store/shared.state';

@Component({
    selector: 'app-onboard',
    templateUrl: './onboard.component.html',
    styleUrls: ['./onboard.component.scss']
})
export class OnboardComponent implements OnInit {

    loginForm: FormGroup;
    registerForm: FormGroup;
    hide = true;
    matcher = new ErrorStateMatcherUtils();
    classValidator = ClassValidator;
    isLoading = false;
    isRegistered = false;
    authUtils = new AuthUtils();

    constructor(
        private authStore: Store<AuthState>,
        private sharedStore: Store<SharedState>) {
    }

    ngOnInit(): void {
        this.authUtils.clearLocalStorage();

        this.sharedStore.select(selectIsLoading).subscribe(isLoading => {
            this.isLoading = isLoading;
        });
        this.authStore.select(selectIsRegistered).subscribe(isRegistered => {
            this.isRegistered = isRegistered;
        });

        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email, customEmailValidator]),
            password: new FormControl('', [Validators.required])
        });
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email, customEmailValidator]),
            password: new FormControl('', [Validators.required, passwordValidator]),
            passwordConfirmation: new FormControl('', [Validators.required]),
        }, [passwordConfirmationValidator]);
    }

    get loginEmailFormControl(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    get registerEmailFormControl(): FormControl {
        return this.registerForm.get('email') as FormControl;
    }

    get registerPasswordFormControl(): FormControl {
        return this.registerForm.get('password') as FormControl;
    }

    get registerPasswordConfirmationFormControl(): FormControl {
        return this.registerForm.get('passwordConfirmation') as FormControl;
    }

    passwordMatch(): string {
        return (this.classValidator.checkPasswordConfirmDirtyAndValid(this.registerForm) === 'is-valid') ? '' : 'ng-invalid mat-form-field-invalid';
    }

    showRegisterButton(): boolean {
        if (this.isLoading) {
            return false;
        }
        return !this.isRegistered;
    }

    register(): void {
        const userDTO: RegisterDto = {
            name: this.registerForm.get('name').value,
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value
        };

        this.sharedStore.dispatch(SharedActions.set_isLoading({payload: true}));

        setTimeout(() => {
            this.authStore.dispatch(AuthActions.register_clicked({payload: userDTO}));
        }, GeneralUtils.randomLoadingTime);
    }

    login(): void {
        const userDTO: LoginDto = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value
        };

        this.sharedStore.dispatch(SharedActions.set_isLoading({payload: true}));
        setTimeout(() => {
            this.authStore.dispatch(AuthActions.login_clicked({payload: userDTO}));
        }, GeneralUtils.randomLoadingTime);
    }

}
