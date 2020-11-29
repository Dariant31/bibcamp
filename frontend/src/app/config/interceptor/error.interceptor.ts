import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SharedActions} from '@app/shared/_store/shared.actions';
import {Store} from '@ngrx/store';
import {SharedState} from '@app/shared/_store/shared.state';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private sharedStore: Store<SharedState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            map(event => {
                this.sharedStore.dispatch(SharedActions.error_reset());
                return event;
            }),
            catchError((eventError: HttpErrorResponse) => {
                this.sharedStore.dispatch(SharedActions.set_isLoading({payload: false}));
                const errorObj = (eventError.error.detail) ? eventError.error : {details: 'Oops, some Error occurred, Please try again'};
                return throwError(errorObj);
            })
        );

    }

}
