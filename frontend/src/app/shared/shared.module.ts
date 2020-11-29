import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {sharedReducer} from '@app/shared/_store/shared.reducers';
import {EffectsModule} from '@ngrx/effects';
import {SharedEffects} from '@app/shared/_store/shared.effects';
import {NgModule} from '@angular/core';
import {HeaderComponent} from '@app/shared/component/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,

        // NgRx Module
        StoreModule.forFeature('sharedState', sharedReducer),
        EffectsModule.forFeature([SharedEffects]),

        // Angular Material Module
        MatToolbarModule,
        MatSnackBarModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        HeaderComponent
    ]
})
export class SharedModule {
}
