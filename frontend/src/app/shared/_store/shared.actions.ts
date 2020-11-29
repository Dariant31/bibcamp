import {createAction, props} from '@ngrx/store';

export const SharedActions = {
    error_encountered: createAction(
        '[SHARED] Error Encountered',
        props<{ payload: { detail: string } }>()
    ),
    error_reset: createAction(
        '[SHARED] Error Reset',
    ),
    set_isLoading: createAction(
        '[SHARED] Set isLoading',
        props<{ payload: boolean }>()
    ),
};
