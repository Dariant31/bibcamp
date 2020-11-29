import {Routes} from '@angular/router';
import {DashboardComponent} from '../view/main/dashboard/dashboard.component';
import {OnboardComponent} from '../view/auth/onboard/onboard.component';
import {AuthGuard} from '@app/config/guard/auth.guard';
import {AddBookComponent} from '@app/view/main/add-book/add-book.component';
import {ViewBookComponent} from '@app/view/main/view-book/view-book.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        children: [
            {
                path: '',
                component: OnboardComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'addbook',
        component: AddBookComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'viewbook/:book_id',
        component: ViewBookComponent,
        canActivate: [AuthGuard]
    },
];
