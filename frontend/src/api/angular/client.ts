import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as schemas from '../schemas';
import { SecurityOptions } from '../schemas';

export const BASE_PATH: InjectionToken<string> = new InjectionToken('BASE_PATH');

@Injectable()
export class BibcampAPI {
  private basePath: string = '';
  private defaultHeaders = new HttpHeaders();
    readonly securityOptions: SecurityOptions = {};

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
  ) {
    if (basePath) {
      this.basePath = basePath.replace(/\/+$/, '');
    }
  }

  /** Getbooks */
  public getBooks_books__get(
    
    OAuth2PasswordBearerCookie: SecurityOptions.OAuth2PasswordBearerCookie = this.securityOptions.OAuth2PasswordBearerCookie,
  ): Observable<{
}> {

    let path = '/books/';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;

    
    if (OAuth2PasswordBearerCookie) {
      headers = headers.set('Authorization', this._encodeHttpParameter('Bearer ' + OAuth2PasswordBearerCookie.token));
    }
    

    return this.httpClient.request<any>('GET', `${this.basePath}${path}`, {
      
      params,
      headers,
    });
  }

  /** Addbook */
  public addBook_books__post(
    body: schemas.BookInput,
    OAuth2PasswordBearerCookie: SecurityOptions.OAuth2PasswordBearerCookie = this.securityOptions.OAuth2PasswordBearerCookie,
  ): Observable<{
}> {

    let path = '/books/';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    headers.set('Content-Type', 'application/json');

    
    if (OAuth2PasswordBearerCookie) {
      headers = headers.set('Authorization', this._encodeHttpParameter('Bearer ' + OAuth2PasswordBearerCookie.token));
    }
    

    return this.httpClient.request<any>('POST', `${this.basePath}${path}`, {
      body: this._encodeHttpBody(body, 'application/json'),
      params,
      headers,
    });
  }

  /** Getbookdetail */
  public getBookDetail_books__book_id__get(
    bookId: number,
    
    OAuth2PasswordBearerCookie: SecurityOptions.OAuth2PasswordBearerCookie = this.securityOptions.OAuth2PasswordBearerCookie,
  ): Observable<{
}> {

    let path = '/books/{book_id}';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    path = path.replace('{book_id}', this._encodeHttpParameter(bookId));

    
    if (OAuth2PasswordBearerCookie) {
      headers = headers.set('Authorization', this._encodeHttpParameter('Bearer ' + OAuth2PasswordBearerCookie.token));
    }
    

    return this.httpClient.request<any>('GET', `${this.basePath}${path}`, {
      
      params,
      headers,
    });
  }

  /** Searchbook */
  public searchBook_books_search_post(
    body: schemas.BookSearchDTO,
    OAuth2PasswordBearerCookie: SecurityOptions.OAuth2PasswordBearerCookie = this.securityOptions.OAuth2PasswordBearerCookie,
  ): Observable<{
}> {

    let path = '/books/search';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    headers.set('Content-Type', 'application/json');

    
    if (OAuth2PasswordBearerCookie) {
      headers = headers.set('Authorization', this._encodeHttpParameter('Bearer ' + OAuth2PasswordBearerCookie.token));
    }
    

    return this.httpClient.request<any>('POST', `${this.basePath}${path}`, {
      body: this._encodeHttpBody(body, 'application/json'),
      params,
      headers,
    });
  }

  /** Borrowbook */
  public borrowBook_books_borrow_post(
    body: schemas.BorrowBookInput,
    OAuth2PasswordBearerCookie: SecurityOptions.OAuth2PasswordBearerCookie = this.securityOptions.OAuth2PasswordBearerCookie,
  ): Observable<{
}> {

    let path = '/books/borrow';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    headers.set('Content-Type', 'application/json');

    
    if (OAuth2PasswordBearerCookie) {
      headers = headers.set('Authorization', this._encodeHttpParameter('Bearer ' + OAuth2PasswordBearerCookie.token));
    }
    

    return this.httpClient.request<any>('POST', `${this.basePath}${path}`, {
      body: this._encodeHttpBody(body, 'application/json'),
      params,
      headers,
    });
  }

  /** Getusers */
  public getUsers_users__user_sub__get(
    userSub: string,
    
    
  ): Observable<{
}> {

    let path = '/users/{user_sub}';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    path = path.replace('{user_sub}', this._encodeHttpParameter(userSub));

    

    return this.httpClient.request<any>('GET', `${this.basePath}${path}`, {
      
      params,
      headers,
    });
  }

  /** Register User */
  public register_user_auth_register_user_post(
    body: schemas.RegisterDto,
    
  ): Observable<{
}> {

    let path = '/auth/register_user';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    headers.set('Content-Type', 'application/json');

    

    return this.httpClient.request<any>('POST', `${this.basePath}${path}`, {
      body: this._encodeHttpBody(body, 'application/json'),
      params,
      headers,
    });
  }

  /** Login */
  public login_auth_login_post(
    body: schemas.LoginDto,
    
  ): Observable<{
}> {

    let path = '/auth/login';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    headers.set('Content-Type', 'application/json');

    

    return this.httpClient.request<any>('POST', `${this.basePath}${path}`, {
      body: this._encodeHttpBody(body, 'application/json'),
      params,
      headers,
    });
  }

  /** Fakeep */
  public fakeEP_auth_fakeEndPoint_post(
    transactionStatusEnum: schemas.TransactionStatusEnum,
    body: schemas.BodyFakeEPAuthFakeEndPointPost,
    
  ): Observable<{
}> {

    let path = '/auth/fakeEndPoint';
    let params = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    let headers = this.defaultHeaders;
    headers.set('Content-Type', 'application/json');
    params = params.set('TransactionStatusEnum', this._encodeHttpParameter(transactionStatusEnum));

    

    return this.httpClient.request<any>('POST', `${this.basePath}${path}`, {
      body: this._encodeHttpBody(body, 'application/json'),
      params,
      headers,
    });
  }


  // @TODO: different encoding styles
  protected _encodeHttpParameter(value: any) {
    if (Array.isArray(value)) {
      return value.map(_ => this._encodeHttpParameter(_)).join(',');
    } else if (value !== null && value !== undefined) {
      return String(value);
    } else {
      return '';
    }
  }

  // @TODO: different encoding styles
  protected _encodeHttpBody(value: any, encoding: string) {
    switch (encoding) {
      case 'application/json':
        return value;
      case 'application/x-www-form-urlencoded':
        const formData = new FormData();

        Object.keys(value).forEach(key => {
          formData.append(key, this._encodeHttpParameter(value[key]));
        });

        return formData;
      default:
        throw new Error(`Encoding not supported: ${encoding}`);
    }
  }

}


/**
 * CustomHttpUrlEncodingCodec
 * Fix plus sign (+) not encoding, so sent as blank space
 * See: https://github.com/angular/angular/issues/11058#issuecomment-247367318
 */
export class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  encodeKey(k: string): string {
    k = super.encodeKey(k);
    return k.replace(/\+/gi, '%2B');
  }
  encodeValue(v: string): string {
    v = super.encodeValue(v);
    return v.replace(/\+/gi, '%2B');
  }
}
