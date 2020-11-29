import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {SharedState} from '@app/shared/_store/shared.state';
import {selectError} from '@app/shared/_store/shared.selector';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthUtils} from '@app/shared/utils/auth.utils';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    authUtils = new AuthUtils();

    constructor(
        private sharedStore: Store<SharedState>,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.sharedStore.select(selectError).subscribe(error => {
            if (error) {
                this.openSnackBar(error.detail ? error.detail : 'Oops, some Error occurred, Please try again');
            }
        });
    }

    openSnackBar(msg: string) {
        this._snackBar.open(msg, 'okay', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });
    }

    logOut(): void {
        this.router.navigateByUrl('/auth');
    }

    goToDashboard(): void {
        this.router.navigateByUrl('/dashboard');
    }

}
