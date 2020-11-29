import {BookSearchResponse} from '@app/config/models/book-search-response';
import {Book, BookDetailsResponse, BorrowBookInput} from '@api/schemas';

export interface MainState {
    bookSearchResponse: BookSearchResponse;
    addBookSuccessful: boolean;
    books: Book[];
    selectedBook: BookDetailsResponse;
}

export const initialMainState: MainState = {
    bookSearchResponse: null,
    addBookSuccessful: false,
    books: [],
    selectedBook: null
};
