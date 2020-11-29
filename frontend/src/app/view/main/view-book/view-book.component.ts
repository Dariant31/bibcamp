import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book, BookDetailsResponse, TransactionOutputDto} from '@api/schemas';
import {Store} from '@ngrx/store';
import {MainState} from '@app/view/main/_store/main.state';
import {SharedState} from '@app/shared/_store/shared.state';
import {selectIsLoading} from '@app/shared/_store/shared.selector';
import {selectSelectedBook} from '@app/view/main/_store/main.selector';
import {SharedActions} from '@app/shared/_store/shared.actions';
import {MainActions} from '@app/view/main/_store/main.actions';
import {GeneralUtils} from '@app/shared/utils/general.utils';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface TestObj {
    id: string;
    name: string;
    from: string;
    until: string;
    status: string;

};

@Component({
    selector: 'app-view-book',
    templateUrl: './view-book.component.html',
    styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
    bookId: string;
    bookDetailsResponse: BookDetailsResponse;
    selectedBook: Book;
    bookHistory: TransactionOutputDto[];
    isLoading: boolean;
    displayedColumn: string[] = ['Position', 'Name', 'From', 'Until', 'Status'];
    dataSource: any = null;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private route: ActivatedRoute,
        private mainStore: Store<MainState>,
        private sharedStore: Store<SharedState>
    ) {

    }

    ngOnInit(): void {
        this.fetchBookFromBE();

        this.route.params.subscribe(params => {
            this.bookId = params.book_id;
        });

        this.sharedStore.select(selectIsLoading).subscribe(isLoading => {
            this.isLoading = isLoading;
        });

        this.mainStore.select(selectSelectedBook).subscribe(response => {
            if (response) {
                this.bookDetailsResponse = response;
                this.selectedBook = response.book;
                this.bookHistory = response.transaction;
                this.dataSource = new MatTableDataSource(response.transaction);
                this.dataSource.sort = this.sort;
            }
        });
    }

    fetchBookFromBE(): void {
        this.sharedStore.dispatch(SharedActions.set_isLoading({payload: true}));
        this.mainStore.dispatch(MainActions.reset_view_book());
        setTimeout(() => {
            this.mainStore.dispatch(MainActions.get_book_details({payload: this.bookId}));
        }, GeneralUtils.randomLoadingTime);
    }
}
