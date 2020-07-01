import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as CVFilesActions from './cvfiles.actions';
import { CVFile } from './../../../../models/cvFile.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class CVFilesEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchCVFiles = this.actions$.pipe(
        ofType(CVFilesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ cvFiles: CVFile[] }>(environment.API_BASE_URL + 'cvfiles',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new CVFilesActions.FetchSuccess(resData.cvFiles);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CVFilesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CVFilesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new CVFilesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new CVFilesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createCVFile = this.actions$.pipe(
        ofType(CVFilesActions.CREATE_START),
        switchMap((cvInfo: CVFilesActions.CreateStart) => {
            return this.http.post<{ createdCVFile: CVFile }>(environment.API_BASE_URL + 'cvfiles',
                {
                    fileName: cvInfo.payload.fileName,
                    language: cvInfo.payload.language,
                    filePath: cvInfo.payload.filePath,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new CVFilesActions.CreateSuccess(resData.createdCVFile);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CVFilesActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CVFilesActions.CreateFail([this.error404]));
                            case 400:
                                return of(new CVFilesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new CVFilesActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateCVFile = this.actions$.pipe(
        ofType(CVFilesActions.UPDATE_START),
        switchMap((cvInfo: CVFilesActions.UpdateStart) => {
            return this.http.put<{ updatedCVFile: CVFile }>(environment.API_BASE_URL + 'cvfiles',
                {
                    id: cvInfo.payload.id,
                    fileName: cvInfo.payload.fileName,
                    language: cvInfo.payload.language,
                    filePath: cvInfo.payload.filePath,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new CVFilesActions.UpdateSuccess(resData.updatedCVFile);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CVFilesActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CVFilesActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new CVFilesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new CVFilesActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteCVFile = this.actions$.pipe(
        ofType(CVFilesActions.DELETE_START),
        switchMap((cvInfo: CVFilesActions.DeleteStart) => {
            return this.http.delete<{ deletedCVFileId: number }>(environment.API_BASE_URL + 'cvfiles',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('cvId', cvInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new CVFilesActions.DeleteSuccess(resData.deletedCVFileId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CVFilesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CVFilesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new CVFilesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new CVFilesActions.DeleteFail([this.errorOccured]));
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