import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {authReducer} from '@app/view/auth/_store/auth.reducers';
import {AuthEffects} from '@app/view/auth/_store/auth.effects';
import {OnboardComponent} from '@app/view/auth/onboard/onboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        OnboardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        // NgRx Module
        StoreModule.forFeature('authState', authReducer),
        EffectsModule.forFeature([AuthEffects]),

        // Angular Material Module
        MatTabsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    exports: [
        OnboardComponent
    ]
})
export class AuthModule {
}
