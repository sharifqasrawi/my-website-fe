import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as TrainingCoursesActions from './courses.actions';
import { TrainingCourse } from './../../../../models/trainingCourse.model';
import { Document } from './../../../../models/document.model';


import { environment } from './../../../../../environments/environment';

@Injectable()
export class TrainingCoursesEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchTrainingCourses = this.actions$.pipe(
        ofType(TrainingCoursesActions.FETCH_START),
        switchMap((courseInfo: TrainingCoursesActions.FetchStart) => {
            const fetchUrl = courseInfo.payload && courseInfo.payload === 'admin' ? 'courses/admin' : 'courses';

            return this.http.get<{ courses: TrainingCourse[] }>(environment.API_BASE_URL + fetchUrl,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new TrainingCoursesActions.FetchSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TrainingCoursesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TrainingCoursesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new TrainingCoursesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new TrainingCoursesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createTrainingCourse = this.actions$.pipe(
        ofType(TrainingCoursesActions.CREATE_START),
        switchMap((courseInfo: TrainingCoursesActions.CreateStart) => {
            return this.http.post<{ createdCourse: TrainingCourse }>(environment.API_BASE_URL + 'courses/create',
                {
                    name: courseInfo.payload.name,
                    type: courseInfo.payload.type,
                    duration: courseInfo.payload.duration,
                    establishment: courseInfo.payload.establishment,
                    dateTime: courseInfo.payload.dateTime,
                    courseUrl: courseInfo.payload.courseUrl,
                    country_EN: courseInfo.payload.country_EN,
                    city_EN: courseInfo.payload.city_EN,
                    country_FR: courseInfo.payload.country_FR,
                    city_FR: courseInfo.payload.city_FR,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new TrainingCoursesActions.CreateSuccess(resData.createdCourse);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TrainingCoursesActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TrainingCoursesActions.CreateFail([this.error404]));
                            case 400:
                                return of(new TrainingCoursesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new TrainingCoursesActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateTrainingCourse = this.actions$.pipe(
        ofType(TrainingCoursesActions.UPDATE_START),
        switchMap((courseInfo: TrainingCoursesActions.UpdateStart) => {
            return this.http.put<{ updatedCourse: TrainingCourse }>(environment.API_BASE_URL + 'courses/update',
                {
                    id: courseInfo.payload.id,
                    name: courseInfo.payload.name,
                    type: courseInfo.payload.type,
                    duration: courseInfo.payload.duration,
                    establishment: courseInfo.payload.establishment,
                    dateTime: courseInfo.payload.dateTime,
                    courseUrl: courseInfo.payload.courseUrl,
                    country_EN: courseInfo.payload.country_EN,
                    city_EN: courseInfo.payload.city_EN,
                    country_FR: courseInfo.payload.country_FR,
                    city_FR: courseInfo.payload.city_FR,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new TrainingCoursesActions.UpdateSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TrainingCoursesActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TrainingCoursesActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new TrainingCoursesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new TrainingCoursesActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteTrainingCourse = this.actions$.pipe(
        ofType(TrainingCoursesActions.DELETE_START),
        switchMap((courseInfo: TrainingCoursesActions.DeleteStart) => {
            return this.http.delete<{ deletedCourseId: number }>(environment.API_BASE_URL + 'courses/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('courseId', courseInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new TrainingCoursesActions.DeleteSuccess(resData.deletedCourseId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TrainingCoursesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TrainingCoursesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new TrainingCoursesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new TrainingCoursesActions.DeleteFail([this.errorOccured]));
                        }
                    })
                )
        })
    );



    @Effect()
    createDoc = this.actions$.pipe(
        ofType(TrainingCoursesActions.CREATE_DOC_START),
        switchMap((docInfo: TrainingCoursesActions.CreateDocStart) => {
            return this.http.post<{ createdDocument: Document }>(environment.API_BASE_URL + 'courses/create-document',
                {
                    courseId: docInfo.payload.courseId,
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
                        return new TrainingCoursesActions.CreateDocSuccess(resData.createdDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TrainingCoursesActions.CreateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TrainingCoursesActions.CreateDocFail([this.error404]));
                            case 400:
                                return of(new TrainingCoursesActions.CreateDocFail(errorRes.error.errors));
                            default:
                                return of(new TrainingCoursesActions.CreateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateDoc = this.actions$.pipe(
        ofType(TrainingCoursesActions.UPDATE_DOC_START),
        switchMap((docInfo: TrainingCoursesActions.UpdateDocStart) => {
            return this.http.put<{ updatedDocument: Document }>(environment.API_BASE_URL + 'courses/update-document',
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
                        return new TrainingCoursesActions.UpdateDocSuccess(resData.updatedDocument);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TrainingCoursesActions.UpdateDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TrainingCoursesActions.UpdateDocFail([this.error404]));
                            case 400:
                                return of(new TrainingCoursesActions.UpdateDocFail(errorRes.error.errors));
                            default:
                                return of(new TrainingCoursesActions.UpdateDocFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteDoc = this.actions$.pipe(
        ofType(TrainingCoursesActions.DELETE_DOC_START),
        switchMap((docInfo: TrainingCoursesActions.DeleteDocStart) => {
            return this.http.delete<{ deletedDocumentId: number, courseId: number }>(environment.API_BASE_URL + 'courses/delete-document',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('docId', docInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new TrainingCoursesActions.DeleteDocSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TrainingCoursesActions.DeleteDocFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TrainingCoursesActions.DeleteDocFail([this.error404]));
                            case 400:
                                return of(new TrainingCoursesActions.DeleteDocFail(errorRes.error.errors));
                            default:
                                return of(new TrainingCoursesActions.DeleteDocFail([this.errorOccured]));
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