import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as jwt_decode from 'jwt-decode';

import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                // console.log(authState);
                const isAuth = !!authState.user;
                let isAdmin = false;

                if (isAuth) {
                    const decodedToken: {
                        exp: number,
                        iat: number,
                        role: string,
                        unique_name: string,
                        given_name: string,
                        family_name: string,
                    } = jwt_decode(authState.user.token);

                    isAdmin = authState.isAdmin && decodedToken.role === 'Admin';
                }
                if (isAuth && isAdmin) {
                    return true;
                }
                this.router.navigate(['/security', 'access-denied'], { queryParams: { returnUrl: router.url } });
                return false;
            })
            // tap(isAuth => {
            //   if (!isAuth) {
            //     this.router.navigate(['/auth']);
            //   }
            // })
        );
    }
}
