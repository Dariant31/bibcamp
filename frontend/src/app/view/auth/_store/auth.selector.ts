import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '@app/view/auth/_store/auth.state';

const authStateSelector = createFeatureSelector<AuthState>('authState');

export const selectIsRegistered = createSelector(
    authStateSelector,
    loaderState => loaderState.isRegistered
);
