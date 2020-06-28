import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from './../../../environments/environment';

import { AuthService } from './../auth.service';
import * as AuthActions from './auth.actions';
import { User } from './../../models/user.model';

import * as jwt_decode from 'jwt-decode';

export interface AuthResponseData {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    isAuther: boolean,
    token: string,
    expiresIn: string,
    isActive: boolean,
};

@Injectable()
export class Authffects {

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    login = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((loginData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(environment.API_BASE_URL + 'account/authenticate',
                {
                    email: loginData.payload.email,
                    password: loginData.payload.password
                },
                {
                    headers: new HttpHeaders().append('language', this.translate.currentLang),
                    withCredentials: true,
                })
                .pipe(
                    tap(resData => {
                        const expirationDate = new Date(resData.expiresIn);
                        const expiresIn = expirationDate.getTime() - (new Date()).getTime();
                        this.authService.setLogoutTimer(expiresIn);
                    }),
                    map(resData => {
                        const userData = {
                            username: resData.username,
                            token: resData.token,
                            expiresIn: resData.expiresIn,
                            id: resData.id
                        };
                        localStorage.setItem('userData', JSON.stringify(userData));
                        return new AuthActions.LoginSuccess({
                            email: resData.username,
                            userId: resData.id,
                            token: resData.token,
                            expirationDate: new Date(resData.expiresIn),
                            firstName: resData.firstName,
                            lastName: resData.lastName,
                            isAdmin: resData.isAdmin,
                            redirect: true,
                            isActive: resData.isActive
                        });
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new AuthActions.LoginFail([this.errorAccessDenied]));
                            case 404:
                                return of(new AuthActions.LoginFail([this.error404]));
                            case 400:
                                return of(new AuthActions.LoginFail(errorRes.error.errors));
                            default:
                                return of(new AuthActions.LoginFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect({ dispatch: false })
    logout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/']);
        })
    );


    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                username: string;
                id: string;
                token: string;
                expiresIn: string;
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }

            const loadedUser = new User(
                '',
                '',
                userData.username,
                false,
                userData.id,
                userData.token,
                new Date(userData.expiresIn)
            );


            if (loadedUser.token) {

                const decodedToken: {
                    exp: number,
                    iat: number,
                    role: string,
                    unique_name: string,
                    given_name: string,
                    family_name: string,
                } = jwt_decode(loadedUser.token);
                

                const expirationDuration =
                    new Date(userData.expiresIn).getTime() -
                    new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);

                return new AuthActions.LoginSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData.expiresIn),
                    firstName: decodedToken.given_name,
                    lastName: decodedToken.family_name,
                    isAdmin: decodedToken.role === 'Admin',
                    redirect: false,
                    isActive: loadedUser.isActive
                });

            }
            return { type: 'DUMMY' };
        })
    );


    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.LOGIN_SUCCESS),
        tap((authSuccessAction: AuthActions.LoginSuccess) => {
            if (authSuccessAction.payload.redirect) {
                this.router.navigate(['/', 'admin']);
                // this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl']);
            }
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private translate: TranslateService
    ) { }

    private getErrorsTranslations() {
        this.translate.get(['ERRORS.ACCESS_DENIED', 'ERRORS.ERROR404', 'ERRORS.OOPS']).subscribe(trans => {
            this.errorAccessDenied = trans['ERRORS.ACCESS_DENIED'];
            this.error404 = trans['ERRORS.ERROR404'];
            this.errorOccured = trans['ERRORS.OOPS'];
        });
    }
}