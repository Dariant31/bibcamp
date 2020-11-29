import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {SharedState} from '@app/shared/_store/shared.state';
import {MainState} from '@app/view/main/_store/main.state';
import {SharedActions} from '@app/shared/_store/shared.actions';
import {AuthActions} from '@app/view/auth/_store/auth.actions';
import {GeneralUtils} from '@app/shared/utils/general.utils';
import {MainActions} from '@app/view/main/_store/main.actions';
import {BookInput, BookSearchDTO} from '@api/schemas';
import {selectIsLoading} from '@app/shared/_store/shared.selector';
import {BookSearchResponse} from '@app/config/models/book-search-response';
import {selectAddBookSuccessful, selectBookSearchResponse} from '@app/view/main/_store/main.selector';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
    searchBookFormGroup: FormGroup;
    addBookFormGroup: FormGroup;
    searchByISBN = true;
    isLoading = false;
    bookSearchResponse: BookSearchResponse;
    addBookSucess: boolean;

    constructor(
        private _formBuilder: FormBuilder,
        private mainStore: Store<MainState>,
        private sharedStore: Store<SharedState>
    ) {
    }

    ngOnInit(): void {
        this.sharedStore.select(selectIsLoading).subscribe(isLoading => {
            this.isLoading = isLoading;
        });

        this.mainStore.select(selectAddBookSuccessful).subscribe(bool => {
            this.addBookSucess = bool;
        });

        this.mainStore.select(selectBookSearchResponse).subscribe(bookSearchResponse => {
            this.bookSearchResponse = bookSearchResponse;
            if (bookSearchResponse && bookSearchResponse.isInNet) {
                this.fillAddBookForm();
            }
        });

        this.searchBookFormGroup = this._formBuilder.group({
            search: ['', Validators.required]
        });

        this.addBookFormGroup = this._formBuilder.group({
            title: ['', Validators.required],
            isbn: ['', Validators.required],
            author: ['', Validators.required],
            language: ['', Validators.required],
            genre: ['', Validators.required],
            desc: ['', Validators.required],
            publisher: ['', Validators.required],
            coverUrl: ['https://via.placeholder.com/270x370.png?text=Book+Cover+Image', Validators.required],
        });
    }

    search(): void {
        const bookSearchDTO: BookSearchDTO = {
            type: this.searchType,
            value: this.searchBookFormGroup.get('search').value
        };

        this.sharedStore.dispatch(SharedActions.set_isLoading({payload: true}));

        setTimeout(() => {
            this.mainStore.dispatch(MainActions.add_book_search({payload: bookSearchDTO}));
        }, GeneralUtils.randomLoadingTime);
    }

    toggleSearchType(): void {
        this.searchByISBN = !this.searchByISBN;
    }

    fillAddBookForm(): void {
        const book = this.bookSearchResponse.bookInNet;
        this.addBookFormGroup.get('title').patchValue(book.title);
        this.addBookFormGroup.get('isbn').patchValue(book.isbn);
        this.addBookFormGroup.get('author').patchValue(book.author);
        this.addBookFormGroup.get('language').patchValue(book.language);
        this.addBookFormGroup.get('genre').patchValue(book.genre);
        this.addBookFormGroup.get('desc').patchValue(book.desc);
        this.addBookFormGroup.get('publisher').patchValue(book.publisher);
        this.addBookFormGroup.get('coverUrl').patchValue(book.coverUrl);
    }

    addBook(): void {
        if (this.addBookFormGroup.valid) {
            const bookDTO: BookInput = {
                title: this.addBookFormGroup.get('title').value,
                isbn: this.addBookFormGroup.get('isbn').value,
                author: this.addBookFormGroup.get('author').value,
                language: this.addBookFormGroup.get('language').value,
                genre: this.addBookFormGroup.get('genre').value,
                desc: this.addBookFormGroup.get('desc').value,
                publisher: this.addBookFormGroup.get('publisher').value,
                coverUrl: this.addBookFormGroup.get('coverUrl').value
            };

            this.sharedStore.dispatch(SharedActions.set_isLoading({payload: true}));
            setTimeout(() => {
                this.mainStore.dispatch(MainActions.add_book({payload: bookDTO}));
            }, GeneralUtils.randomLoadingTime);
        }
    }

    get showFoundHint(): boolean {
        return this.bookSearchResponse && this.bookSearchResponse.isInNet;
    }

    get searchType(): string {
        return (this.searchByISBN) ? 'ISBN' : 'TITLE';
    }

    get resultAvailable(): boolean {
        return this.bookSearchResponse != null;
    }

}
