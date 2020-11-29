import {createReducer, on} from '@ngrx/store';
import {AuthState, initialAuthState} from '@app/view/auth/_store/auth.state';
import {AuthActions} from '@app/view/auth/_store/auth.actions';

const _authReducer = createReducer(
    initialAuthState,
    on(
        AuthActions.set_isRegistered,
        (state: AuthState, {payload}): AuthState => ({
            ...state,
            isRegistered: payload
        })
    ),
    on(
        AuthActions.login_success,
        (state: AuthState, {payload}): AuthState => ({
            ...state,
            user: payload
        })
    )
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
