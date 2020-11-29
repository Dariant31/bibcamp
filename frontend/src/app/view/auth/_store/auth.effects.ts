import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActions} from '@app/view/auth/_store/auth.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {SharedActions} from '@app/shared/_store/shared.actions';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthUtils} from '@app/shared/utils/auth.utils';
import {BibcampAPI} from '@api/angular/client';

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login_clicked),
        switchMap((action) => {
            return (this.bibcampAPI.login_auth_login_post(action.payload) as Observable<string>).pipe(
                mergeMap((response) => {
                    this.authUtils.setJwtToken(response);
                    this.router.navigateByUrl('/dashboard');
                    return [
                        AuthActions.login_success({payload: this.authUtils.getDecodedToken().user}),
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

    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register_clicked),
        switchMap((action) => {
            return (this.bibcampAPI.register_user_auth_register_user_post(action.payload) as Observable<string>).pipe(
                mergeMap((response) => {
                    return [
                        SharedActions.set_isLoading({payload: false}),
                        AuthActions.set_isRegistered({payload: true})
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
        private bibcampAPI: BibcampAPI,
        private router: Router,
        private authUtils: AuthUtils
    ) {
    }
}
