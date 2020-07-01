import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as PersonalInfoActions from './personalInfo.actions';
import { PersonalInfo } from './../../../../models/PersonalInfo.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class PersonalInfoffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchPersonalInfo = this.actions$.pipe(
        ofType(PersonalInfoActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ personalInfo: PersonalInfo }>(environment.API_BASE_URL + 'personalinfo',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new PersonalInfoActions.FetchSuccess(resData.personalInfo);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new PersonalInfoActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new PersonalInfoActions.FetchFail([this.error404]));
                            case 400:
                                return of(new PersonalInfoActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new PersonalInfoActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updatePersonalInfo = this.actions$.pipe(
        ofType(PersonalInfoActions.UPDATE_START),
        switchMap((infoData: PersonalInfoActions.UpdateStart) => {
            return this.http.put<{ updatedPersonalInfo: PersonalInfo }>(environment.API_BASE_URL + 'personalinfo',
                {
                    name: infoData.payload.name,
                    title_EN: infoData.payload.title_EN,
                    title_FR: infoData.payload.title_FR,
                    about_EN: infoData.payload.about_EN,
                    about_FR: infoData.payload.about_FR,
                    dateOfBirth: infoData.payload.dateOfBirth,
                    imagePath: infoData.payload.imagePath,
                    maritalStatus: infoData.payload.maritalStatus,
                    driversLicense: infoData.payload.driversLicense
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new PersonalInfoActions.UpdateSuccess(resData.updatedPersonalInfo);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new PersonalInfoActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new PersonalInfoActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new PersonalInfoActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new PersonalInfoActions.UpdateFail([this.errorOccured]));
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
                if (user)
                    this.token = user.token;
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