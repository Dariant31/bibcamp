export interface SharedState {
    error: { detail: string };
    isLoading: boolean;
}

export const initialSharedState: SharedState = {
    error: null,
    isLoading: false
};
