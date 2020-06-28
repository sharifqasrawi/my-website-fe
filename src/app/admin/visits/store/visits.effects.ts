import { Visit } from './../../../models/visit.model';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';

import * as VisitsActions from './visits.actions';

@Injectable()
export class VisitsEffects {

    token = '';
    userName = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    visitApp = this.actions$.pipe(
        ofType(VisitsActions.VISIT_START),
        switchMap(() => {
            return this.http.post<{ visitsCount: number }>(environment.API_BASE_URL + 'visits', null,
                {
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new VisitsActions.VisitSuccess(resData.visitsCount);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new VisitsActions.VisitFail([this.errorAccessDenied]));
                            case 404:
                                return of(new VisitsActions.VisitFail([this.error404]));
                            case 400:
                                return of(new VisitsActions.VisitFail(errorRes.error.errors));
                            default:
                                return of(new VisitsActions.VisitFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchVisitsClient = this.actions$.pipe(
        ofType(VisitsActions.FETCH_VISITS_CLIENT_START),
        switchMap(() => {
            return this.http.get<{ visitsCount: number }>(environment.API_BASE_URL + 'visits/client', {
                headers: new HttpHeaders().append('language', this.translate.currentLang),
                withCredentials: true
            })
                .pipe(
                    map(resData => {
                        return new VisitsActions.FetchVisitsClientSuccess(resData.visitsCount);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new VisitsActions.FetchVisitsClientFail([this.errorAccessDenied]));
                            case 404:
                                return of(new VisitsActions.FetchVisitsClientFail([this.error404]));
                            case 400:
                                return of(new VisitsActions.FetchVisitsClientFail(errorRes.error.errors));
                            default:
                                return of(new VisitsActions.FetchVisitsClientFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchVisitsAdmin = this.actions$.pipe(
        ofType(VisitsActions.FETCH_VISITS_ADMIN_START),
        switchMap(() => {
            return this.http.get<{ visits: Visit[] }>(environment.API_BASE_URL + 'visits/admin',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new VisitsActions.FetchVisitsAdminSuccess(resData.visits);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new VisitsActions.FetchVisitsAdminFail([this.errorAccessDenied]));
                            case 404:
                                return of(new VisitsActions.FetchVisitsAdminFail([this.error404]));
                            case 400:
                                return of(new VisitsActions.FetchVisitsAdminFail(errorRes.error.errors));
                            default:
                                return of(new VisitsActions.FetchVisitsAdminFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
        private translate: TranslateService
    ) {

        this.store.select('auth')
            .pipe(
                map(authState => authState.user)
            )
            .subscribe(user => {
                if (user) {
                    this.token = user.token;
                    this.userName = user.firstName + ' ' + user.lastName;
                    this.userId = user.id;
                }
            });
    }

    private getErrorsTranslations() {
        this.translate.get(['ERRORS.ACCESS_DENIED', 'ERRORS.ERROR404', 'ERRORS.OOPS']).subscribe(trans => {
            this.errorAccessDenied = trans['ERRORS.ACCESS_DENIED'];
            this.error404 = trans['ERRORS.ERROR404'];
            this.errorOccured = trans['ERRORS.OOPS'];
        });
    }
}