import {Book, BookInput} from '@api/schemas';

export interface BookSearchResponse {
    isInLocalDb: boolean;
    isInNet: boolean;
    bookInDB: Book;
    bookInNet: BookInput;
}
