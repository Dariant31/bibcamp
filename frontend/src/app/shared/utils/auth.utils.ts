import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtToken} from '@app/config/models/jwt-token';


export class AuthUtils {
    private helper: JwtHelperService;

    constructor() {
        this.helper = new JwtHelperService();
    }

    setJwtToken(idToken: string): void {
        if (this.isTokenValid(idToken)) {
            localStorage.setItem('token', idToken);
        }
    }

    isLoggedIn(): boolean {
        return this.getToken() ? this.isTokenValid(this.getToken()) : false;
    }

    getUserGroups(): string[] {
        if (this.isLoggedIn() && this.getDecodedToken()['cognito:groups']) {
            return this.getDecodedToken()['cognito:groups'];
        }
        return [];
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    clearLocalStorage(): void {
        localStorage.clear();
    }

    getDecodedToken(): JwtToken {
        return this.helper.decodeToken(this.getToken());
    }

    private isTokenValid(token: string) {
        try {
            return !this.helper.isTokenExpired(token);
        } catch (e) {
            return false;
        }
    }

}
