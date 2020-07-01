import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as LanguagesActions from './languages.actions';
import { Language } from './../../../../models/language.model';
import { Document } from './../../../../models/document.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class LanguagesEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchLanguages = this.actions$.pipe(
        ofType(LanguagesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ languages: Language[] }>(environment.API_BASE_URL + 'languages',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new LanguagesActions.FetchSuccess(resData.languages);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new LanguagesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new LanguagesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new LanguagesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new LanguagesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createLanguage = this.actions$.pipe(
        ofType(LanguagesActions.CREATE_START),
        switchMap((langInfo: LanguagesActions.CreateStart) => {
            return this.http.post<{ createdLanguage: Language }>(environment.API_BASE_URL + 'languages/create',
                {
                    name_EN: langInfo.payload.name_EN,
                    name_FR: langInfo.payload.name_FR,
                    levelRead: langInfo.payload.levelRead,
                    levelSpeak: langInfo.payload.levelSpeak,
                    levelWrite: langInfo.payload.levelWrite

                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new LanguagesActions.CreateSuccess(resData.createdLanguage);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new LanguagesActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new LanguagesActions.CreateFail([this.error404]));
                            case 400:
                                return of(new LanguagesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new LanguagesActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateLanguage = this.actions$.pipe(
        ofType(LanguagesActions.UPDATE_START),
        switchMap((langInfo: LanguagesActions.UpdateStart) => {
            return this.http.put<{ updatedLanguage: Language }>(environment.API_BASE_URL + 'languages/update',
                {
                    id: langInfo.payload.id,
                    name_EN: langInfo.payload.name_EN,
                    name_FR: langInfo.payload.name_FR,
                    levelRead: langInfo.payload.levelRead,
                    levelSpeak: langInfo.payload.levelSpeak,
                    levelWrite: langInfo.payload.levelWrite
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new LanguagesActions.UpdateSuccess(resData.updatedLanguage);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new LanguagesActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new LanguagesActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new LanguagesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new LanguagesActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteLanguage = this.actions$.pipe(
        ofType(LanguagesActions.DELETE_START),
        switchMap((langInfo: LanguagesActions.DeleteStart) => {
            return this.http.delete<{ deletedLanguageId: number }>(environment.API_BASE_URL + 'languages/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('langId', langInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new LanguagesActions.DeleteSuccess(resData.deletedLanguageId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new LanguagesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new LanguagesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new LanguagesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new LanguagesActions.DeleteFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    createDoc = this.actions$.pipe(
        ofType(LanguagesActions.CREATE_DOC_START),
        switchMap((docInfo: LanguagesActions.CreateDocStart) => {
            return this.http.post<{ createdDocument: Document }>(environment.API_BASE_URL + 'languages/create-document',
                {
                    languageId: docInfo.payload.languageId,
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
                        return new LanguagesActions.CreateDocSuccess(resData.createdDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new LanguagesActions.CreateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new LanguagesActions.CreateDocFail([this.error404]));
                            case 400:
                                return of(new LanguagesActions.CreateDocFail(errorRes.error.errors));
                            default:
                                return of(new LanguagesActions.CreateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateDoc = this.actions$.pipe(
        ofType(LanguagesActions.UPDATE_DOC_START),
        switchMap((docInfo: LanguagesActions.UpdateDocStart) => {
            return this.http.put<{ updatedDocument: Document }>(environment.API_BASE_URL + 'languages/update-document',
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
                        return new LanguagesActions.UpdateDocSuccess(resData.updatedDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new LanguagesActions.UpdateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new LanguagesActions.UpdateDocFail([this.error404]));
                            case 400:
                                return of(new LanguagesActions.UpdateDocFail(errorRes.error.errors));
                            default:
                                return of(new LanguagesActions.UpdateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteDoc = this.actions$.pipe(
        ofType(LanguagesActions.DELETE_DOC_START),
        switchMap((docInfo: LanguagesActions.DeleteDocStart) => {
            return this.http.delete<{ deletedDocumentId: number, languageId: number }>(environment.API_BASE_URL + 'languages/delete-document',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('docId', docInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new LanguagesActions.DeleteDocSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new LanguagesActions.DeleteDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new LanguagesActions.DeleteDocFail([this.error404]));
                            case 400:
                                return of(new LanguagesActions.DeleteDocFail(errorRes.error.errors));
                            default:
                                return of(new LanguagesActions.DeleteDocFail([this.errorOccured]));
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