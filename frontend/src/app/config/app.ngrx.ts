import {AuthState, initialAuthState} from '@app/view/auth/_store/auth.state';
import {initialSharedState, SharedState} from '@app/shared/_store/shared.state';
import {initialMainState, MainState} from '@app/view/main/_store/main.state';

export interface NgrxFeatureState {
    sharedState: SharedState;
    authState: AuthState;
    mainState: MainState;
}

export const initialState: NgrxFeatureState = {
    sharedState: initialSharedState,
    authState: initialAuthState,
    mainState: initialMainState
};
