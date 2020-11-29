import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SharedState} from '@app/shared/_store/shared.state';

const sharedStateSelector = createFeatureSelector<SharedState>('sharedState');

export const selectError = createSelector(
    sharedStateSelector,
    loaderState => loaderState.error
);

export const selectIsLoading = createSelector(
    sharedStateSelector,
    loaderState => loaderState.isLoading
);
