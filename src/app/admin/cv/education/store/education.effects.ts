import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as EducationActions from './education.actions';
import { Education } from './../../../../models/education.model';
import { Document } from './../../../../models/document.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class EducationEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchEducations = this.actions$.pipe(
        ofType(EducationActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ educations: Education[] }>(environment.API_BASE_URL + 'educations',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new EducationActions.FetchSuccess(resData.educations);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new EducationActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new EducationActions.FetchFail([this.error404]));
                            case 400:
                                return of(new EducationActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new EducationActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createEducation = this.actions$.pipe(
        ofType(EducationActions.CREATE_START),
        switchMap((eduInfo: EducationActions.CreateStart) => {
            return this.http.post<{ createdEducation: Education }>(environment.API_BASE_URL + 'educations/create',
                {
                    title_EN: eduInfo.payload.title_EN,
                    title_FR: eduInfo.payload.title_FR,
                    establishment_EN: eduInfo.payload.establishment_EN,
                    establishment_FR: eduInfo.payload.establishment_FR,
                    mention_EN: eduInfo.payload.mention_EN,
                    mention_FR: eduInfo.payload.mention_FR,
                    country_EN: eduInfo.payload.country_EN,
                    country_FR: eduInfo.payload.country_FR,
                    city_EN: eduInfo.payload.city_EN,
                    city_FR: eduInfo.payload.city_FR,
                    specialization_EN: eduInfo.payload.specialization_EN,
                    specialization_FR: eduInfo.payload.specialization_FR,
                    yearsCount: eduInfo.payload.yearsCount,
                    note: eduInfo.payload.note,
                    startDate: eduInfo.payload.startDate,
                    graduateDate: eduInfo.payload.graduateDate,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new EducationActions.CreateSuccess(resData.createdEducation);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new EducationActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new EducationActions.CreateFail([this.error404]));
                            case 400:
                                return of(new EducationActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new EducationActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateEducation = this.actions$.pipe(
        ofType(EducationActions.UPDATE_START),
        switchMap((eduInfo: EducationActions.UpdateStart) => {
            return this.http.put<{ updatedEducation: Education }>(environment.API_BASE_URL + 'educations/update',
                {
                    id: eduInfo.payload.id,
                    title_EN: eduInfo.payload.title_EN,
                    title_FR: eduInfo.payload.title_FR,
                    establishment_EN: eduInfo.payload.establishment_EN,
                    establishment_FR: eduInfo.payload.establishment_FR,
                    mention_EN: eduInfo.payload.mention_EN,
                    mention_FR: eduInfo.payload.mention_FR,
                    country_EN: eduInfo.payload.country_EN,
                    country_FR: eduInfo.payload.country_FR,
                    city_EN: eduInfo.payload.city_EN,
                    city_FR: eduInfo.payload.city_FR,
                    specialization_EN: eduInfo.payload.specialization_EN,
                    specialization_FR: eduInfo.payload.specialization_FR,
                    yearsCount: eduInfo.payload.yearsCount,
                    note: eduInfo.payload.note,
                    startDate: eduInfo.payload.startDate,
                    graduateDate: eduInfo.payload.graduateDate,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new EducationActions.UpdateSuccess(resData.updatedEducation);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new EducationActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new EducationActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new EducationActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new EducationActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteEducation = this.actions$.pipe(
        ofType(EducationActions.DELETE_START),
        switchMap((eduInfo: EducationActions.DeleteStart) => {
            return this.http.delete<{ deletedEducationId: number }>(environment.API_BASE_URL + 'educations/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('eduId', eduInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new EducationActions.DeleteSuccess(resData.deletedEducationId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new EducationActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new EducationActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new EducationActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new EducationActions.DeleteFail([this.errorOccured]));
                        }
                    })
                )
        })
    );




    @Effect()
    createDoc = this.actions$.pipe(
        ofType(EducationActions.CREATE_DOC_START),
        switchMap((docInfo: EducationActions.CreateDocStart) => {
            return this.http.post<{ createdDocument: Document }>(environment.API_BASE_URL + 'educations/create-document',
                {
                    educationId: docInfo.payload.educationId,
                    name_EN: docInfo.payload.name_EN,
                    name_FR: docInfo.payload.name_FR,
                    description_EN: docInfo.payload.description_EN,
                    description_FR: docInfo.payload.description_FR,
                    path: docInfo.payload.path,
                    fileId: docInfo.payload.fileId,
                    isDisplayed: docInfo.payload.isDisplayed
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new EducationActions.CreateDocSuccess(resData.createdDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new EducationActions.CreateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new EducationActions.CreateDocFail([this.error404]));
                            case 400:
                                return of(new EducationActions.CreateDocFail(errorRes.error.errors));
                            default:
                                return of(new EducationActions.CreateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateDoc = this.actions$.pipe(
        ofType(EducationActions.UPDATE_DOC_START),
        switchMap((docInfo: EducationActions.UpdateDocStart) => {
            return this.http.put<{ updatedDocument: Document }>(environment.API_BASE_URL + 'educations/update-document',
                {
                    id: docInfo.payload.id,
                    name_EN: docInfo.payload.name_EN,
                    name_FR: docInfo.payload.name_FR,
                    description_EN: docInfo.payload.description_EN,
                    description_FR: docInfo.payload.description_FR,
                    path: docInfo.payload.path,
                    fileId: docInfo.payload.fileId,
                    isDisplayed: docInfo.payload.isDisplayed
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new EducationActions.UpdateDocSuccess(resData.updatedDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new EducationActions.UpdateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new EducationActions.UpdateDocFail([this.error404]));
                            case 400:
                                return of(new EducationActions.UpdateDocFail(errorRes.error.errors));
                            default:
                                return of(new EducationActions.UpdateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteDoc = this.actions$.pipe(
        ofType(EducationActions.DELETE_DOC_START),
        switchMap((docInfo: EducationActions.DeleteDocStart) => {
            return this.http.delete<{ deletedDocumentId: number, educationId: number }>(environment.API_BASE_URL + 'educations/delete-document',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('docId', docInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new EducationActions.DeleteDocSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new EducationActions.DeleteDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new EducationActions.DeleteDocFail([this.error404]));
                            case 400:
                                return of(new EducationActions.DeleteDocFail(errorRes.error.errors));
                            default:
                                return of(new EducationActions.DeleteDocFail([this.errorOccured]));
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