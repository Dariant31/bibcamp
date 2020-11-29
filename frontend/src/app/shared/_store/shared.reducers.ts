import {createReducer, on} from '@ngrx/store';
import {initialSharedState, SharedState} from '@app/shared/_store/shared.state';
import {SharedActions} from '@app/shared/_store/shared.actions';

const _sharedReducer = createReducer(
    initialSharedState,
    on(
        SharedActions.error_encountered,
        (state: SharedState, {payload}): SharedState => ({
            ...state,
            error: payload
        })
    ),
    on(
        SharedActions.error_reset,
        (state: SharedState): SharedState => ({
            ...state,
            error: null
        })
    ),
    on(
        SharedActions.set_isLoading,
        (state: SharedState, {payload}): SharedState => ({
            ...state,
            isLoading: payload
        })
    )
);

export function sharedReducer(state, action) {
    return _sharedReducer(state, action);
}
