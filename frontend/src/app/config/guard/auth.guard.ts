import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {AuthUtils} from '@app/shared/utils/auth.utils';



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authUtils: AuthUtils, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authUtils.isLoggedIn()) {
            // case: token not found
            this.router.navigateByUrl('/auth');
            return false;
        }
        return true;
    }
}
