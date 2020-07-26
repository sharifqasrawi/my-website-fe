import { ProjectImage } from './../../../../models/projectImage.model';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as ProjectsActions from './projects.actions';
import { Project } from './../../../../models/project.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class ProjectsEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchProjects = this.actions$.pipe(
        ofType(ProjectsActions.FETCH_START),
        switchMap((prjInfo: ProjectsActions.FetchStart) => {
            const fetchUrl = prjInfo.payload && prjInfo.payload === 'admin' ? 'projects/admin' : 'projects';
            return this.http.get<{ projects: Project[] }>(environment.API_BASE_URL + fetchUrl,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.FetchSuccess(resData.projects);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createProject = this.actions$.pipe(
        ofType(ProjectsActions.CREATE_START),
        switchMap((projectInfo: ProjectsActions.CreateStart) => {
            return this.http.post<{ createdProject: Project }>(environment.API_BASE_URL + 'projects',
                {
                    name_EN: projectInfo.payload.name_EN,
                    description_EN: projectInfo.payload.description_EN,
                    type: projectInfo.payload.type,
                    size: projectInfo.payload.size,
                    gitHubUrl: projectInfo.payload.gitHubUrl,
                    isDisplayed: projectInfo.payload.isDisplayed,
                    liveDemoUrl: projectInfo.payload.liveDemoUrl,
                    videoDemoUrl: projectInfo.payload.videoDemoUrl,
                    videoDemoUrlExt: projectInfo.payload.videoDemoUrlExt,
                    imagePath: projectInfo.payload.imagePath,
                    name_FR: projectInfo.payload.name_FR,
                    description_FR: projectInfo.payload.description_FR

                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.CreateSuccess(resData.createdProject);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.CreateFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateProject = this.actions$.pipe(
        ofType(ProjectsActions.UPDATE_START),
        switchMap((projectInfo: ProjectsActions.UpdateStart) => {
            return this.http.put<{ updatedProject: Project }>(environment.API_BASE_URL + 'projects',
                {
                    id: projectInfo.payload.id,
                    name_EN: projectInfo.payload.name_EN,
                    description_EN: projectInfo.payload.description_EN,
                    type: projectInfo.payload.type,
                    size: projectInfo.payload.size,
                    gitHubUrl: projectInfo.payload.gitHubUrl,
                    isDisplayed: projectInfo.payload.isDisplayed,
                    liveDemoUrl: projectInfo.payload.liveDemoUrl,
                    videoDemoUrl: projectInfo.payload.videoDemoUrl,
                    videoDemoUrlExt: projectInfo.payload.videoDemoUrlExt,
                    imagePath: projectInfo.payload.imagePath,
                    name_FR: projectInfo.payload.name_FR,
                    description_FR: projectInfo.payload.description_FR
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.UpdateSuccess(resData.updatedProject);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteProject = this.actions$.pipe(
        ofType(ProjectsActions.DELETE_START),
        switchMap((projectInfo: ProjectsActions.DeleteStart) => {
            return this.http.delete<{ deletedProjectId: number }>(environment.API_BASE_URL + 'projects',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('projectId', projectInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.DeleteSuccess(resData.deletedProjectId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.DeleteFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    addRemoveTagToProject = this.actions$.pipe(
        ofType(ProjectsActions.ADD_REMOVE_TAG_START),
        switchMap((projectData: ProjectsActions.AddRemoveTagStart) => {
            return this.http.put<{ updatedProject: Project }>(environment.API_BASE_URL + 'projects/tag-project',
                {
                    projectId: projectData.payload.projectId,
                    tagId: projectData.payload.tagId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('action', projectData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.AddRemoveTagSuccess(resData.updatedProject);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.AddRemoveTagFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.AddRemoveTagFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.AddRemoveTagFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.AddRemoveTagFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createProjectImage = this.actions$.pipe(
        ofType(ProjectsActions.CREATE_IMAGE_START),
        switchMap((imgInfo: ProjectsActions.CreateImageStart) => {
            return this.http.post<{ createdProjectImage: ProjectImage }>(environment.API_BASE_URL + 'projects/create-image',
                {
                    projectId: imgInfo.payload.projectId,
                    caption_EN: imgInfo.payload.caption_EN,
                    path: imgInfo.payload.path,
                    isDisplayed: imgInfo.payload.isDisplayed,
                    caption_FR: imgInfo.payload.caption_FR,

                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.CreateImageSuccess(resData.createdProjectImage);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.CreateImageFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.CreateImageFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.CreateImageFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.CreateImageFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    updateProjectImage = this.actions$.pipe(
        ofType(ProjectsActions.UPDATE_IMAGE_START),
        switchMap((imgInfo: ProjectsActions.UpdateImageStart) => {
            return this.http.put<{ updatedProjectImage: ProjectImage }>(environment.API_BASE_URL + 'projects/update-image',
                {
                    id: imgInfo.payload.id,
                    caption_EN: imgInfo.payload.caption_EN,
                    path: imgInfo.payload.path,
                    isDisplayed: imgInfo.payload.isDisplayed,
                    caption_FR: imgInfo.payload.caption_FR,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.UpdateImageSuccess(resData.updatedProjectImage);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.UpdateImageFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.UpdateImageFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.UpdateImageFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.UpdateImageFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteProjectImage = this.actions$.pipe(
        ofType(ProjectsActions.DELETE_IMAGE_START),
        switchMap((imgInfo: ProjectsActions.DeleteImageStart) => {
            return this.http.delete<{ deletedProjectImageId: number, projectId: number }>(environment.API_BASE_URL + 'projects/delete-image',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('id', imgInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new ProjectsActions.DeleteImageSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ProjectsActions.DeleteImageFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ProjectsActions.DeleteImageFail([this.error404]));
                            case 400:
                                return of(new ProjectsActions.DeleteImageFail(errorRes.error.errors));
                            default:
                                return of(new ProjectsActions.DeleteImageFail([this.errorOccured]));
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