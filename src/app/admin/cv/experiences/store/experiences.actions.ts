import { Document } from './../../../../models/document.model';
import { Experience } from './../../../../models/experience.model';
import { Action } from '@ngrx/store';


export const FETCH_START = '[Experiences] Fetch Start';
export const FETCH_SUCCESS = '[Experiences] Fetch Success';
export const FETCH_FAIL = '[Experiences] Fetch Fail';

export const CREATE_START = '[Experiences] Create Start';
export const CREATE_SUCCESS = '[Experiences] Create Success';
export const CREATE_FAIL = '[Experiences] Create Fail';

export const UPDATE_START = '[Experiences] Update Start';
export const UPDATE_SUCCESS = '[Experiences] Update Success';
export const UPDATE_FAIL = '[Experiences] Update Fail';

export const DELETE_START = '[Experiences] Delete Start';
export const DELETE_SUCCESS = '[Experiences] Delete Success';
export const DELETE_FAIL = '[Experiences] Delete Fail';

export const CREATE_DOC_START = '[Experiences] Create Doc Start';
export const CREATE_DOC_SUCCESS = '[Experiences] Create Doc Success';
export const CREATE_DOC_FAIL = '[Experiences] Create Doc Fail';

export const UPDATE_DOC_START = '[Experiences] Update Doc Start';
export const UPDATE_DOC_SUCCESS = '[Experiences] Update Doc Success';
export const UPDATE_DOC_FAIL = '[Experiences] Update Doc Fail';

export const DELETE_DOC_START = '[Experiences] Delete Doc Start';
export const DELETE_DOC_SUCCESS = '[Experiences] Delete Doc Success';
export const DELETE_DOC_FAIL = '[Experiences] Delete Doc Fail';


export const CLEAR_ERRORS = '[Experiences] Clear Errors';
export const CLEAR_STATUS = '[Experiences] Clear Status';
export const CLEAR_CREATE = '[Experiences] Clear Create';

///////////

export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload?: string) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Experience[]) { }
}


export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        title_EN: string,
        company: string,
        accomplishments_EN: string,
        responisbilites_EN: string,
        country_EN: string,
        city_EN: string,
        startDate: Date,
        endDate?: Date,
        isCurrentlyWorking?: boolean,
        city_FR?: string,
        country_FR?: string,
        accomplishments_FR?: string,
        responisbilites_FR?: string,
        title_FR?: string,
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Experience) { }
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
        title_EN: string,
        company: string,
        accomplishments_EN: string,
        responisbilites_EN: string,
        country_EN: string,
        city_EN: string,
        startDate: Date,
        endDate?: Date,
        isCurrentlyWorking?: boolean,
        city_FR?: string,
        country_FR?: string,
        accomplishments_FR?: string,
        responisbilites_FR?: string,
        title_FR?: string,
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Experience) { }
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
        experienceId: number,
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

    constructor(public payload: { deletedDocumentId: number, experienceId: number }) { }
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

export type ExperiencesActions =
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