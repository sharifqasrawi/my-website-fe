import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as ExperiencesActions from './experiences.actions';
import { Experience } from './../../../../models/experience.model';
import { Document } from './../../../../models/document.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class ExperiencesEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchExperiences = this.actions$.pipe(
        ofType(ExperiencesActions.FETCH_START),
        switchMap((expInfo: ExperiencesActions.FetchStart) => {
            const fetchUrl = expInfo.payload && expInfo.payload === 'admin' ? 'experiences/admin' : 'experiences';
            return this.http.get<{ experiences: Experience[] }>(environment.API_BASE_URL + fetchUrl,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ExperiencesActions.FetchSuccess(resData.experiences);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ExperiencesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ExperiencesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new ExperiencesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new ExperiencesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createExperience = this.actions$.pipe(
        ofType(ExperiencesActions.CREATE_START),
        switchMap((expInfo: ExperiencesActions.CreateStart) => {
            return this.http.post<{ createdExperience: Experience }>(environment.API_BASE_URL + 'experiences/create',
                {
                    title_EN: expInfo.payload.title_EN,
                    title_FR: expInfo.payload.title_FR,
                    company: expInfo.payload.company,
                    accomplishments_EN: expInfo.payload.accomplishments_EN,
                    accomplishments_FR: expInfo.payload.accomplishments_FR,
                    responisbilites_EN: expInfo.payload.responisbilites_EN,
                    responisbilites_FR: expInfo.payload.responisbilites_FR,
                    country_EN: expInfo.payload.country_EN,
                    country_FR: expInfo.payload.country_FR,
                    city_EN: expInfo.payload.city_EN,
                    city_FR: expInfo.payload.city_FR,
                    startDate: expInfo.payload.startDate,
                    endDate: expInfo.payload.endDate,
                    isCurrentlyWorking: expInfo.payload.isCurrentlyWorking
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ExperiencesActions.CreateSuccess(resData.createdExperience);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ExperiencesActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ExperiencesActions.CreateFail([this.error404]));
                            case 400:
                                return of(new ExperiencesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new ExperiencesActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateExperience = this.actions$.pipe(
        ofType(ExperiencesActions.UPDATE_START),
        switchMap((expInfo: ExperiencesActions.UpdateStart) => {
            return this.http.put<{ updatedExperience: Experience }>(environment.API_BASE_URL + 'experiences/update',
                {
                    id: expInfo.payload.id,
                    title_EN: expInfo.payload.title_EN,
                    title_FR: expInfo.payload.title_FR,
                    company: expInfo.payload.company,
                    accomplishments_EN: expInfo.payload.accomplishments_EN,
                    accomplishments_FR: expInfo.payload.accomplishments_FR,
                    responisbilites_EN: expInfo.payload.responisbilites_EN,
                    responisbilites_FR: expInfo.payload.responisbilites_FR,
                    country_EN: expInfo.payload.country_EN,
                    country_FR: expInfo.payload.country_FR,
                    city_EN: expInfo.payload.city_EN,
                    city_FR: expInfo.payload.city_FR,
                    startDate: expInfo.payload.startDate,
                    endDate: expInfo.payload.endDate,
                    isCurrentlyWorking: expInfo.payload.isCurrentlyWorking
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ExperiencesActions.UpdateSuccess(resData.updatedExperience);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ExperiencesActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ExperiencesActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new ExperiencesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new ExperiencesActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteExperience = this.actions$.pipe(
        ofType(ExperiencesActions.DELETE_START),
        switchMap((expInfo: ExperiencesActions.DeleteStart) => {
            return this.http.delete<{ deletedExperienceId: number }>(environment.API_BASE_URL + 'experiences/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('expId', expInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ExperiencesActions.DeleteSuccess(resData.deletedExperienceId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ExperiencesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ExperiencesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new ExperiencesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new ExperiencesActions.DeleteFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    createDoc = this.actions$.pipe(
        ofType(ExperiencesActions.CREATE_DOC_START),
        switchMap((docInfo: ExperiencesActions.CreateDocStart) => {
            return this.http.post<{ createdDocument: Document }>(environment.API_BASE_URL + 'experiences/create-document',
                {
                    experienceId: docInfo.payload.experienceId,
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
                        return new ExperiencesActions.CreateDocSuccess(resData.createdDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ExperiencesActions.CreateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ExperiencesActions.CreateDocFail([this.error404]));
                            case 400:
                                return of(new ExperiencesActions.CreateDocFail(errorRes.error.errors));
                            default:
                                return of(new ExperiencesActions.CreateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateDoc = this.actions$.pipe(
        ofType(ExperiencesActions.UPDATE_DOC_START),
        switchMap((docInfo: ExperiencesActions.UpdateDocStart) => {
            return this.http.put<{ updatedDocument: Document }>(environment.API_BASE_URL + 'experiences/update-document',
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
                        return new ExperiencesActions.UpdateDocSuccess(resData.updatedDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ExperiencesActions.UpdateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ExperiencesActions.UpdateDocFail([this.error404]));
                            case 400:
                                return of(new ExperiencesActions.UpdateDocFail(errorRes.error.errors));
                            default:
                                return of(new ExperiencesActions.UpdateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteDoc = this.actions$.pipe(
        ofType(ExperiencesActions.DELETE_DOC_START),
        switchMap((docInfo: ExperiencesActions.DeleteDocStart) => {
            return this.http.delete<{ deletedDocumentId: number, experienceId: number }>(environment.API_BASE_URL + 'experiences/delete-document',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('docId', docInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ExperiencesActions.DeleteDocSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ExperiencesActions.DeleteDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ExperiencesActions.DeleteDocFail([this.error404]));
                            case 400:
                                return of(new ExperiencesActions.DeleteDocFail(errorRes.error.errors));
                            default:
                                return of(new ExperiencesActions.DeleteDocFail([this.errorOccured]));
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