import {UserDto} from '@app/config/models/user-dto';

export class JwtToken {
    user: UserDto;
    exp: number;
}
