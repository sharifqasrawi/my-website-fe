import { Action } from '@ngrx/store';

import { Language } from './../../../../models/language.model';
import { Document } from './../../../../models/document.model';


export const FETCH_START = '[Languages] Fetch Start';
export const FETCH_SUCCESS = '[Languages] Fetch Success';
export const FETCH_FAIL = '[Languages] Fetch Fail';

export const CREATE_START = '[Languages] Create Start';
export const CREATE_SUCCESS = '[Languages] Create Success';
export const CREATE_FAIL = '[Languages] Create Fail';

export const UPDATE_START = '[Languages] Update Start';
export const UPDATE_SUCCESS = '[Languages] Update Success';
export const UPDATE_FAIL = '[Languages] Update Fail';

export const DELETE_START = '[Languages] Delete Start';
export const DELETE_SUCCESS = '[Languages] Delete Success';
export const DELETE_FAIL = '[Languages] Delete Fail';

export const CREATE_DOC_START = '[Languages] Create Doc Start';
export const CREATE_DOC_SUCCESS = '[Languages] Create Doc Success';
export const CREATE_DOC_FAIL = '[Languages] Create Doc Fail';

export const UPDATE_DOC_START = '[Languages] Update Doc Start';
export const UPDATE_DOC_SUCCESS = '[Languages] Update Doc Success';
export const UPDATE_DOC_FAIL = '[Languages] Update Doc Fail';

export const DELETE_DOC_START = '[Languages] Delete Doc Start';
export const DELETE_DOC_SUCCESS = '[Languages] Delete Doc Success';
export const DELETE_DOC_FAIL = '[Languages] Delete Doc Fail';


export const CLEAR_ERRORS = '[Languages] Clear Errors';
export const CLEAR_STATUS = '[Languages] Clear Status';
export const CLEAR_CREATE = '[Languages] Clear Create';

///////////

export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Language[]) { }
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
        levelRead: number,
        levelSpeak: number,
        levelWrite: string,
        name_FR?: string
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Language) { }
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
        levelRead: number,
        levelSpeak: number,
        levelWrite: string,
        name_FR?: string
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Language) { }
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

export class CreateDocStart implements Action {
    readonly type = CREATE_DOC_START;

    constructor(public payload: {
        languageId: number,
        name_EN: string,
        description_EN: string,
        path: string,
        fileId: number,
        isDisplayed: boolean,
        description_FR?: string,
        name_FR?: string,
    }) { }
}

export class CreateDocSuccess implements Action {
    readonly type = CREATE_DOC_SUCCESS;

    constructor(public payload: Document) { }
}


export class CreateDocFail implements Action {
    readonly type = CREATE_DOC_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class UpdateDocStart implements Action {
    readonly type = UPDATE_DOC_START;

    constructor(public payload: {
        id: number,
        name_EN: string,
        description_EN: string,
        path: string,
        fileId: number,
        isDisplayed: boolean,
        description_FR?: string,
        name_FR?: string,
    }) { }
}

export class UpdateDocSuccess implements Action {
    readonly type = UPDATE_DOC_SUCCESS;

    constructor(public payload: Document) { }
}


export class UpdateDocFail implements Action {
    readonly type = UPDATE_DOC_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class DeleteDocStart implements Action {
    readonly type = DELETE_DOC_START;

    constructor(public payload: number) { }
}

export class DeleteDocSuccess implements Action {
    readonly type = DELETE_DOC_SUCCESS;

    constructor(public payload: { deletedDocumentId: number, languageId: number }) { }
}


export class DeleteDocFail implements Action {
    readonly type = DELETE_DOC_FAIL;

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

export type LanguagesActions =
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
    | CreateDocStart
    | CreateDocSuccess
    | CreateDocFail
    | UpdateDocStart
    | UpdateDocSuccess
    | UpdateDocFail
    | DeleteDocStart
    | DeleteDocSuccess
    | DeleteDocFail
    | ClearErrors
    | ClearStatus
    | ClearCreate
    ;