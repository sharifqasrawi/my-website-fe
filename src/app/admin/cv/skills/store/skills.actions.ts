import { Action } from '@ngrx/store';

import { Category } from './../../../../models/category.model';
import { Skill } from './../../../../models/skill.model';

export const FETCH_CATEGORIES_START = '[Skills] Fetch Categories Start';
export const FETCH_CATEGORIES_SUCCESS = '[Skills] Fetch Categories Success';
export const FETCH_CATEGORIES_FAIL = '[Skills] Fetch Categories Fail';

export const CREATE_CATEGORY_START = '[Skills] Create Category Start';
export const CREATE_CATEGORY_SUCCESS = '[Skills] Create Category Success';
export const CREATE_CATEGORY_FAIL = '[Skills] Create Category Fail';

export const UPDATE_CATEGORY_START = '[Skills] Update Category Start';
export const UPDATE_CATEGORY_SUCCESS = '[Skills] Update Category Success';
export const UPDATE_CATEGORY_FAIL = '[Skills] Update Category Fail';

export const DELETE_CATEGORY_START = '[Skills] Delete Category Start';
export const DELETE_CATEGORY_SUCCESS = '[Skills] Delete Category Success';
export const DELETE_CATEGORY_FAIL = '[Skills] Delete Category Fail';



export const FETCH_SKILLS_START = '[Skills] Fetch Skills Start';
export const FETCH_SKILLS_SUCCESS = '[Skills] Fetch Skills Success';
export const FETCH_SKILLS_FAIL = '[Skills] Fetch Skills Fail';

export const CREATE_SKILL_START = '[Skills] Create Skill Start';
export const CREATE_SKILL_SUCCESS = '[Skills] Create Skill Success';
export const CREATE_SKILL_FAIL = '[Skills] Create Skill Fail';

export const UPDATE_SKILL_START = '[Skills] Update Skill Start';
export const UPDATE_SKILL_SUCCESS = '[Skills] Update Skill Success';
export const UPDATE_SKILL_FAIL = '[Skills] Update Skill Fail';

export const DELETE_SKILL_START = '[Skills] Delete Skill Start';
export const DELETE_SKILL_SUCCESS = '[Skills] Delete Skill Success';
export const DELETE_SKILL_FAIL = '[Skills] Delete Skill Fail';


export const CLEAR_ERRORS = '[Skills] Clear Errors';
export const CLEAR_STATUS = '[Skills] Clear Status';
export const CLEAR_CREATE = '[Skills] Clear Create';

///////////

export class FetchCategoriesStart implements Action {
    readonly type = FETCH_CATEGORIES_START;
}

export class FetchCategoriesSuccess implements Action {
    readonly type = FETCH_CATEGORIES_SUCCESS;

    constructor(public payload: Category[]) { }
}

export class FetchCategoriesFail implements Action {
    readonly type = FETCH_CATEGORIES_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class CreateCategoryStart implements Action {
    readonly type = CREATE_CATEGORY_START;

    constructor(public payload: {
        name_EN: string,
        name_FR: string
    }) { }
}

export class CreateCategorySuccess implements Action {
    readonly type = CREATE_CATEGORY_SUCCESS;

    constructor(public payload: Category) { }
}

export class CreateCategoryFail implements Action {
    readonly type = CREATE_CATEGORY_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class UpdateCategoryStart implements Action {
    readonly type = UPDATE_CATEGORY_START;

    constructor(public payload: {
        id: number,
        name_EN: string,
        name_FR: string
    }) { }
}

export class UpdateCategorySuccess implements Action {
    readonly type = UPDATE_CATEGORY_SUCCESS;

    constructor(public payload: Category) { }
}

export class UpdateCategoryFail implements Action {
    readonly type = UPDATE_CATEGORY_FAIL;

    constructor(public payload: string[]) { }
}


///////////

export class DeleteCategoryStart implements Action {
    readonly type = DELETE_CATEGORY_START;

    constructor(public payload: number) { }
}

export class DeleteCategorySuccess implements Action {
    readonly type = DELETE_CATEGORY_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteCategoryFail implements Action {
    readonly type = DELETE_CATEGORY_FAIL;

    constructor(public payload: string[]) { }
}


///////////

export class FetchSkillsStart implements Action {
    readonly type = FETCH_SKILLS_START;
}

export class FetchSkillsSuccess implements Action {
    readonly type = FETCH_SKILLS_SUCCESS;

    constructor(public payload: Skill[]) { }
}

export class FetchSkillsFail implements Action {
    readonly type = FETCH_SKILLS_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class CreateSkillStart implements Action {
    readonly type = CREATE_SKILL_START;

    constructor(public payload: {
        name_EN: string,
        name_FR: string,
        level: number,
        categoryId: number
    }) { }
}

export class CreateSkillSuccess implements Action {
    readonly type = CREATE_SKILL_SUCCESS;

    constructor(public payload: Skill) { }
}

export class CreateSkillFail implements Action {
    readonly type = CREATE_SKILL_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class UpdateSkillStart implements Action {
    readonly type = UPDATE_SKILL_START;

    constructor(public payload: {
        id: number,
        name_EN: string,
        name_FR: string,
        level: number,
        categoryId: number
    }) { }
}

export class UpdateSkillSuccess implements Action {
    readonly type = UPDATE_SKILL_SUCCESS;

    constructor(public payload: Skill) { }
}

export class UpdateSkillFail implements Action {
    readonly type = UPDATE_SKILL_FAIL;

    constructor(public payload: string[]) { }
}


///////////

export class DeleteSkillStart implements Action {
    readonly type = DELETE_SKILL_START;

    constructor(public payload: number) { }
}

export class DeleteSkillSuccess implements Action {
    readonly type = DELETE_SKILL_SUCCESS;

    constructor(public payload: { deletedSkillId: number, categoryId: number }) { }
}

export class DeleteSkillFail implements Action {
    readonly type = DELETE_SKILL_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

export class ClearCreate implements Action {
    readonly type = CLEAR_CREATE;
}

///////////

export type SkillsActions =
    | FetchCategoriesStart
    | FetchCategoriesSuccess
    | FetchCategoriesFail
    | CreateCategoryStart
    | CreateCategorySuccess
    | CreateCategoryFail
    | UpdateCategoryStart
    | UpdateCategorySuccess
    | UpdateCategoryFail
    | DeleteCategoryStart
    | DeleteCategorySuccess
    | DeleteCategoryFail
    | FetchSkillsStart
    | FetchSkillsSuccess
    | FetchSkillsFail
    | CreateSkillStart
    | CreateSkillSuccess
    | CreateSkillFail
    | UpdateSkillStart
    | UpdateSkillSuccess
    | UpdateSkillFail
    | DeleteSkillStart
    | DeleteSkillSuccess
    | DeleteSkillFail
    | ClearErrors
    | ClearStatus
    | ClearCreate
    ;