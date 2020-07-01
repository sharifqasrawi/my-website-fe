import { Action } from '@ngrx/store';

import { CVFile } from './../../../../models/cvFile.model';

export const FETCH_START = '[CV Files] Fetch Start';
export const FETCH_SUCCESS = '[CV Files] Fetch Success';
export const FETCH_FAIL = '[CV Files] Fetch Fail';

export const CREATE_START = '[CV Files] Create Start';
export const CREATE_SUCCESS = '[CV Files] Create Success';
export const CREATE_FAIL = '[CV Files] Create Fail';

export const UPDATE_START = '[CV Files] Update Start';
export const UPDATE_SUCCESS = '[CV Files] Update Success';
export const UPDATE_FAIL = '[CV Files] Update Fail';

export const DELETE_START = '[CV Files] Delete Start';
export const DELETE_SUCCESS = '[CV Files] Delete Success';
export const DELETE_FAIL = '[CV Files] Delete Fail';

export const CLEAR_ERRORS = '[CV Files] Clear Errors';
export const CLEAR_STATUS = '[CV Files] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: CVFile[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

///////////


export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        fileName: string,
        language: string,
        filePath: string
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: CVFile) { }
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
        fileName: string,
        language: string,
        filePath: string
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: CVFile) { }
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

///////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


///////////

export type CVFilesActions =
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
    | ClearErrors
    | ClearStatus
    ;