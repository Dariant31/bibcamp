import {createReducer, on} from '@ngrx/store';
import {initialMainState, MainState} from '@app/view/main/_store/main.state';
import {MainActions} from '@app/view/main/_store/main.actions';

const _mainReducer = createReducer(
    initialMainState,
    on(
        MainActions.get_book_success,
        (state: MainState, {payload}): MainState => ({
            ...state,
            books: payload
        })
    ),
    on(
        MainActions.add_book_search_success,
        (state: MainState, {payload}): MainState => ({
            ...state,
            bookSearchResponse: payload
        })
    ),
    on(
        MainActions.add_book_success,
        (state: MainState, {payload}): MainState => ({
            ...state,
            addBookSuccessful: true,
            books: [...state.books, payload]
        })
    ),
    on(
        MainActions.get_book_details_success,
        (state: MainState, {payload}): MainState => ({
            ...state,
            selectedBook: payload
        })
    ),
    on(
        MainActions.reset_view_book,
        (state: MainState): MainState => ({
            ...state,
            selectedBook: null
        })
    )
);

export function mainReducer(state, action) {
    return _mainReducer(state, action);
}
