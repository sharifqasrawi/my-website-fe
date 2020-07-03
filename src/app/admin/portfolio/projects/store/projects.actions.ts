

import { Action } from '@ngrx/store';

import { Project } from './../../../../models/project.model';


export const FETCH_START = '[Projects] Fetch Start';
export const FETCH_SUCCESS = '[Projects] Fetch Success';
export const FETCH_FAIL = '[Projects] Fetch Fail';

export const CREATE_START = '[Projects] Create Start';
export const CREATE_SUCCESS = '[Projects] Create Success';
export const CREATE_FAIL = '[Projects] Create Fail';

export const UPDATE_START = '[Projects] Update Start';
export const UPDATE_SUCCESS = '[Projects] Update Success';
export const UPDATE_FAIL = '[Projects] Update Fail';

export const DELETE_START = '[Projects] Delete Start';
export const DELETE_SUCCESS = '[Projects] Delete Success';
export const DELETE_FAIL = '[Projects] Delete Fail';

export const ADD_REMOVE_TAG_START = '[Projects] Add Remove Tag Start';
export const ADD_REMOVE_TAG_SUCCESS = '[Projects] Remove Tag Success';
export const ADD_REMOVE_TAG_FAIL = '[Projects] Remove Tag Restore Fail';

export const CLEAR_ERRORS = '[Projects] Clear Errors';
export const CLEAR_STATUS = '[Projects] Clear Status';
export const CLEAR_CREATE = '[Projects] Clear Create';

///////////

export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Project[]) { }
}


export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        name_EN: string,
        description_EN: string,
        type: string,
        size: string,
        gitHubUrl: string,
        isDisplayed: boolean,
        liveDemoUrl: string,
        videoDemoUrl: string,
        videoDemoUrlExt: string,
        imagePath: string,
        name_FR?: string
        description_FR?: string
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Project) { }
}


export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        id: number,
        name_EN: string,
        description_EN: string,
        type: string,
        size: string,
        gitHubUrl: string,
        isDisplayed: boolean,
        liveDemoUrl: string,
        videoDemoUrl: string,
        videoDemoUrlExt: string,
        imagePath: string,
        name_FR?: string
        description_FR?: string
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Project) { }
}


export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class DeleteStart implements Action {
    readonly type = DELETE_START;

    constructor(public payload: number) { }
}

export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload: number) { }
}


export class DeleteFail implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: string[]) { }
}


//////////

export class AddRemoveTagStart implements Action {
    readonly type = ADD_REMOVE_TAG_START;

    constructor(public payload: {
        projectId: number,
        tagId: number,
        action: string
    }) { }
}

export class AddRemoveTagSuccess implements Action {
    readonly type = ADD_REMOVE_TAG_SUCCESS;

    constructor(public payload: Project) { }
}

export class AddRemoveTagFail implements Action {
    readonly type = ADD_REMOVE_TAG_FAIL;

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

export type ProjectsActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | CreateStart
    | CreateSuccess
    | CreateFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    | AddRemoveTagStart
    | AddRemoveTagSuccess
    | AddRemoveTagFail
    | ClearErrors
    | ClearStatus
    | ClearCreate
    ;