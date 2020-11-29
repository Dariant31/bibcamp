import {createAction, props} from '@ngrx/store';
import {Book, BookDetailsResponse, BookInput, BookSearchDTO} from '@api/schemas';
import {BookSearchResponse} from '@app/config/models/book-search-response';

export const MainActions = {
    get_book_details: createAction(
        '[MAIN] Get Book detail',
        props<{ payload: string }>()
    ),
    get_book_details_success: createAction(
        '[MAIN] Get Book Details success',
        props<{ payload: BookDetailsResponse }>()
    ),
    get_book: createAction(
        '[MAIN] Get Book'
    ),
    get_book_success: createAction(
        '[MAIN] Get Book Success',
        props<{ payload: Book[] }>()
    ),
    add_book_search: createAction(
        '[MAIN] Add Book Search',
        props<{ payload: BookSearchDTO }>()
    ),
    add_book_search_success: createAction(
        '[MAIN] Add Book Search Success',
        props<{ payload: BookSearchResponse }>()
    ),
    add_book: createAction(
        '[MAIN] Add Book',
        props<{ payload: BookInput }>()
    ),
    add_book_success: createAction(
        '[MAIN] Add Book Success',
        props<{ payload: Book }>()
    ),
    reset_view_book: createAction(
        '[MAIN] Reset View Book'
    ),
};
