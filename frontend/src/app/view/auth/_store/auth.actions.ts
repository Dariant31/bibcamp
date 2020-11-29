import {createAction, props} from '@ngrx/store';
import {LoginDto, RegisterDto} from '@api/schemas';
import {JwtToken} from '@app/config/models/jwt-token';
import {UserDto} from '@app/config/models/user-dto';

export const AuthActions = {
    register_clicked: createAction(
        '[AUTH] Register button Clicked',
        props<{ payload: RegisterDto }>()
    ),
    login_clicked: createAction(
        '[AUTH] Login button Clicked',
        props<{ payload: LoginDto }>()
    ),
    login_success: createAction(
        '[AUTH] Login button Success',
        props<{ payload: UserDto }>()
    ),
    set_isRegistered: createAction(
        '[SHARED] Set isRegistered',
        props<{ payload: boolean }>()
    ),
};
