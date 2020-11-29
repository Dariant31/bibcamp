import {UserDto} from '@app/config/models/user-dto';

export interface AuthState {
    isRegistered: boolean;
    user: UserDto;
}

export const initialAuthState: AuthState = {
    isRegistered: false,
    user: null
};
