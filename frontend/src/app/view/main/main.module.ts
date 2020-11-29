import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mainReducer} from '@app/view/main/_store/main.reducers';
import {MainEffects} from '@app/view/main/_store/main.effects';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {AddBookComponent} from './add-book/add-book.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {DashboardComponent} from '@app/view/main/dashboard/dashboard.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {ViewBookComponent} from './view-book/view-book.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';

@NgModule({
    declarations: [
        DashboardComponent,
        AddBookComponent,
        ViewBookComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        StoreModule.forFeature('mainState', mainReducer),
        EffectsModule.forFeature([MainEffects]),

        // angular Material Module
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule
    ],
    exports: []
})
export class MainModule {
}
