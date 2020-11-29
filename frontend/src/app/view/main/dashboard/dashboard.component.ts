import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import {MainState} from '@app/view/main/_store/main.state';
import {SharedState} from '@app/shared/_store/shared.state';
import {selectIsLoading} from '@app/shared/_store/shared.selector';
import {selectAddBookSuccessful, selectBooks} from '@app/view/main/_store/main.selector';
import {Book} from '@api/schemas';
import {SharedActions} from '@app/shared/_store/shared.actions';
import {MainActions} from '@app/view/main/_store/main.actions';
import {GeneralUtils} from '@app/shared/utils/general.utils';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    isLoading = false;
    books: Book[];

    constructor(
        private mainStore: Store<MainState>,
        private sharedStore: Store<SharedState>,
        private router: Router) {

    }

    ngOnInit(): void {
        this.fetchBookFromBE();
        this.sharedStore.select(selectIsLoading).subscribe(isLoading => {
            this.isLoading = isLoading;
        });

        this.mainStore.select(selectBooks).subscribe(books => {
            this.books = books;
        });
    }

    fetchBookFromBE(): void {
        this.sharedStore.dispatch(SharedActions.set_isLoading({payload: true}));
        setTimeout(() => {
            this.mainStore.dispatch(MainActions.get_book());
        }, GeneralUtils.randomLoadingTime);
    }

    selectBook(bookId: number): void {
        this.router.navigateByUrl('/viewbook/' + bookId);
    }

}
