export interface BodyFakeEPAuthFakeEndPointPost {
    loginDto: LoginDto;
    registerDto: RegisterDto;
    Token: Token;
    TokenData: TokenData;
    transaction_dto: Transaction;
    TransactionOutputDto: TransactionOutputDto;
    book_dto: Book;
    book_dto_input: BookInput;
    bookSearchDTO: BookSearchDTO;
    bookSearchResponse: BookSearchResponse;
    bookDetailsResponse: BookDetailsResponse;
    borrowBookInput: BorrowBookInput;
    transaction_dto_input: TransactionInput;
    user_dto: User;
    user_dto_input: UserInput;
}

export interface Book {
    id: number;
    title: string;
    isbn: string;
    author: string;
    language: string;
    genre: string;
    desc: string;
    publisher: string;
    coverUrl: string;
}

export interface BookInput {
    title: string;
    isbn: string;
    author: string;
    language: string;
    genre: string;
    desc: string;
    publisher: string;
    coverUrl: string;
}

export interface HTTPValidationError {
    detail?: Array<ValidationError>;
}

export interface Token {
    access_token: string;
    token_type: string;
}

export interface TokenData {
    email?: string;
}

export interface Transaction {
    id: number;
    userId: number;
    bookId: number;
    fromUNIX: number;
    untilUNIX: number;
    status: string;
}

export interface TransactionOutputDto {
    name: string;
    fromUNIX: number;
    untilUNIX: number;
    status: string;
}

export enum TransactionStatusEnum {
    COMPLETED = 'COMPLETED',
    ONGOING = 'ONGOING',
    OVERDUE = 'OVERDUE'
}


export interface TransactionInput {
    userId: number;
    bookId: number;
    fromUNIX: number;
    untilUNIX: number;
    status: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean;
    hashed_password: string;
}

export interface UserInput {
    name: string;
    email: string;
    isAdmin?: boolean;
    hashed_password: string;
}

export interface ValidationError {
    loc: Array<string>;
    msg: string;
    type: string;
}

export interface BookDetailsResponse {
    book: Book;
    transaction: Array<TransactionOutputDto>;
    isBorrowed: boolean;
}

export interface BookSearchDTO {
    type: string | string;
    value: string;
}

export interface BookSearchResponse {
    isInLocalDb: boolean;
    isInNet: boolean;
    bookInDB?: Book;
    bookInNet?: BookInput;
}

export interface BorrowBookInput {
    book_id: number;
    user_id: number;
    fromUNIX: number;
    untilUNIX: number;
    status: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}


export interface SecurityOptions {
    OAuth2PasswordBearerCookie?: SecurityOptions.OAuth2PasswordBearerCookie;
}

export namespace SecurityOptions {
    export interface OAuth2PasswordBearerCookie {
        token: string
    }
}
