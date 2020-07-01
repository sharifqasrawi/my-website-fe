import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as ContactInfoActions from './contactInfo.actions';
import { ContactInfo } from './../../../../models/contactInfo.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class ContactInfoffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchContactInfo = this.actions$.pipe(
        ofType(ContactInfoActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ contactInfo: ContactInfo }>(environment.API_BASE_URL + 'contactinfo',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ContactInfoActions.FetchSuccess(resData.contactInfo);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ContactInfoActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ContactInfoActions.FetchFail([this.error404]));
                            case 400:
                                return of(new ContactInfoActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new ContactInfoActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateContactInfo = this.actions$.pipe(
        ofType(ContactInfoActions.UPDATE_START),
        switchMap((infoData: ContactInfoActions.UpdateStart) => {
            return this.http.put<{ updatedContactInfo: ContactInfo }>(environment.API_BASE_URL + 'Contactinfo',
                {
                    emails: infoData.payload.emails,
                    phone: infoData.payload.phone,
                    country_EN: infoData.payload.country_EN,
                    country_FR: infoData.payload.country_FR,
                    city_EN: infoData.payload.city_EN,
                    city_FR: infoData.payload.city_FR,
                    street: infoData.payload.street,
                    streetNumber: infoData.payload.streetNumber,
                    zipCode: infoData.payload.zipCode,
                    linkedInUrl: infoData.payload.linkedInUrl,
                    gitHubUrl: infoData.payload.gitHubUrl,
                    facebookUrl: infoData.payload.facebookUrl,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ContactInfoActions.UpdateSuccess(resData.updatedContactInfo);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ContactInfoActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ContactInfoActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new ContactInfoActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new ContactInfoActions.UpdateFail([this.errorOccured]));
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