import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MainState} from '@app/view/main/_store/main.state';

const mainStateSelector = createFeatureSelector<MainState>('mainState');

export const selectBookSearchResponse = createSelector(
    mainStateSelector,
    loaderState => loaderState.bookSearchResponse
);

export const selectAddBookSuccessful = createSelector(
    mainStateSelector,
    loaderState => loaderState.addBookSuccessful
);

export const selectBooks = createSelector(
    mainStateSelector,
    loaderState => loaderState.books
);

export const selectSelectedBook = createSelector(
    mainStateSelector,
    loaderState => loaderState.selectedBook
);
