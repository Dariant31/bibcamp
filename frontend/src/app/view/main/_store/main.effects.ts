import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SharedActions} from '@app/shared/_store/shared.actions';
import {MainActions} from '@app/view/main/_store/main.actions';
import {BibcampAPI} from '@api/angular/client';
import {BookSearchResponse} from '@app/config/models/book-search-response';
import {Book, BookDetailsResponse} from '@api/schemas';

@Injectable()
export class MainEffects {

    getbook$ = createEffect(() => this.actions$.pipe(
        ofType(MainActions.get_book),
        switchMap((action) => {
            return (this.bibcampAPI.getBooks_books__get() as Observable<Book[]>).pipe(
                mergeMap((response) => {
                    return [
                        MainActions.get_book_success({payload: response}),
                        SharedActions.set_isLoading({payload: false})
                    ];
                }),
                catchError((error: { detail: string }) => {
                    return [
                        SharedActions.error_encountered({payload: error})
                    ];
                })
            );
        })
    ));

    getbookDetails$ = createEffect(() => this.actions$.pipe(
        ofType(MainActions.get_book_details),
        switchMap((action) => {
            return (this.bibcampAPI.getBookDetail_books__book_id__get(+action.payload) as Observable<BookDetailsResponse>).pipe(
                mergeMap((response) => {
                    return [
                        MainActions.get_book_details_success({payload: response}),
                        SharedActions.set_isLoading({payload: false})
                    ];
                }),
                catchError((error: { detail: string }) => {
                    return [
                        SharedActions.error_encountered({payload: error})
                    ];
                })
            );
        })
    ));

    bookSearch$ = createEffect(() => this.actions$.pipe(
        ofType(MainActions.add_book_search),
        switchMap((action) => {
            return (this.bibcampAPI.searchBook_books_search_post(action.payload) as Observable<BookSearchResponse>).pipe(
                mergeMap((response) => {
                    return [
                        MainActions.add_book_search_success({payload: response}),
                        SharedActions.set_isLoading({payload: false})
                    ];
                }),
                catchError((error: { detail: string }) => {
                    return [
                        SharedActions.error_encountered({payload: error})
                    ];
                })
            );
        })
    ));

    bookAdd$ = createEffect(() => this.actions$.pipe(
        ofType(MainActions.add_book),
        switchMap((action) => {
            return (this.bibcampAPI.addBook_books__post(action.payload) as Observable<Book>).pipe(
                mergeMap((response) => {
                    return [
                        MainActions.add_book_success({payload: response}),
                        SharedActions.set_isLoading({payload: false})
                    ];
                }),
                catchError((error: { detail: string }) => {
                    return [
                        SharedActions.error_encountered({payload: error})
                    ];
                })
            );
        })
    ));

    constructor(
        private actions$: Actions,
        private bibcampAPI: BibcampAPI
    ) {
    }
}
