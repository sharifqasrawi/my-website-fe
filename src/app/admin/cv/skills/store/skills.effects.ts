import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../../store/app.reducer';
import * as SkillsActions from './skills.actions';
import { Category } from './../../../../models/category.model';
import { Skill } from './../../../../models/skill.model';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class SkillsEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchSkillCategories = this.actions$.pipe(
        ofType(SkillsActions.FETCH_CATEGORIES_START),
        switchMap(() => {
            return this.http.get<{ skillCategories: Category[] }>(environment.API_BASE_URL + 'skills/categories',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.FetchCategoriesSuccess(resData.skillCategories);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.FetchCategoriesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.FetchCategoriesFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.FetchCategoriesFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.FetchCategoriesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createSkillCategory = this.actions$.pipe(
        ofType(SkillsActions.CREATE_CATEGORY_START),
        switchMap((catInfo: SkillsActions.CreateCategoryStart) => {
            return this.http.post<{ createdSkillCategory: Category }>(environment.API_BASE_URL + 'skills/create-category',
                {
                    name_EN: catInfo.payload.name_EN,
                    name_FR: catInfo.payload.name_FR
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.CreateCategorySuccess(resData.createdSkillCategory);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.CreateCategoryFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.CreateCategoryFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.CreateCategoryFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.CreateCategoryFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateSkillCategory = this.actions$.pipe(
        ofType(SkillsActions.UPDATE_CATEGORY_START),
        switchMap((catInfo: SkillsActions.UpdateCategoryStart) => {
            return this.http.put<{ updatedSkillCategory: Category }>(environment.API_BASE_URL + 'skills/update-category',
                {
                    id: catInfo.payload.id,
                    name_EN: catInfo.payload.name_EN,
                    name_FR: catInfo.payload.name_FR
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.UpdateCategorySuccess(resData.updatedSkillCategory);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.UpdateCategoryFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.UpdateCategoryFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.UpdateCategoryFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.UpdateCategoryFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteSkillCategory = this.actions$.pipe(
        ofType(SkillsActions.DELETE_CATEGORY_START),
        switchMap((catInfo: SkillsActions.DeleteCategoryStart) => {
            return this.http.delete<{ deletedSkillCategoryId: number }>(environment.API_BASE_URL + 'skills/delete-category',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('catId', catInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.DeleteCategorySuccess(resData.deletedSkillCategoryId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.DeleteCategoryFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.DeleteCategoryFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.DeleteCategoryFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.DeleteCategoryFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    /////////

    @Effect()
    fetchSkills = this.actions$.pipe(
        ofType(SkillsActions.FETCH_SKILLS_START),
        switchMap(() => {
            return this.http.get<{ skills: Skill[] }>(environment.API_BASE_URL + 'skills/skills',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.FetchSkillsSuccess(resData.skills);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.FetchSkillsFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.FetchSkillsFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.FetchSkillsFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.FetchSkillsFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createSkill = this.actions$.pipe(
        ofType(SkillsActions.CREATE_SKILL_START),
        switchMap((skillInfo: SkillsActions.CreateSkillStart) => {
            return this.http.post<{ createdSkill: Skill }>(environment.API_BASE_URL + 'skills/create',
                {
                    name_EN: skillInfo.payload.name_EN,
                    name_FR: skillInfo.payload.name_FR,
                    level: skillInfo.payload.level,
                    categoryId: skillInfo.payload.categoryId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.CreateSkillSuccess(resData.createdSkill);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.CreateSkillFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.CreateSkillFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.CreateSkillFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.CreateSkillFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateSkill = this.actions$.pipe(
        ofType(SkillsActions.UPDATE_SKILL_START),
        switchMap((skillInfo: SkillsActions.UpdateSkillStart) => {
            return this.http.put<{ updatedSkill: Skill }>(environment.API_BASE_URL + 'skills/update',
                {
                    id: skillInfo.payload.id,
                    name_EN: skillInfo.payload.name_EN,
                    name_FR: skillInfo.payload.name_FR,
                    level: skillInfo.payload.level
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.UpdateSkillSuccess(resData.updatedSkill);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.UpdateSkillFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.UpdateSkillFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.UpdateSkillFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.UpdateSkillFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteSkill = this.actions$.pipe(
        ofType(SkillsActions.DELETE_SKILL_START),
        switchMap((skillInfo: SkillsActions.DeleteSkillStart) => {
            return this.http.delete<{ deletedSkillId: number, categoryId: number }>(environment.API_BASE_URL + 'skills/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('skillId', skillInfo.payload.toString()),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new SkillsActions.DeleteSkillSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SkillsActions.DeleteSkillFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SkillsActions.DeleteSkillFail([this.error404]));
                            case 400:
                                return of(new SkillsActions.DeleteSkillFail(errorRes.error.errors));
                            default:
                                return of(new SkillsActions.DeleteSkillFail([this.errorOccured]));
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