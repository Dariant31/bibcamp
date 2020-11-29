import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtTokenInterceptor} from '@app/config/interceptor/jwt.interceptor';
import {ErrorInterceptor} from '@app/config/interceptor/error.interceptor';

export const httpInterceptorsProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtTokenInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    }
];
