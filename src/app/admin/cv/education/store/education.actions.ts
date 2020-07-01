import { Document } from './../../../../models/document.model';
import { Education } from './../../../../models/education.model';
import { Action } from '@ngrx/store';


export const FETCH_START = '[Education] Fetch Start';
export const FETCH_SUCCESS = '[Education] Fetch Success';
export const FETCH_FAIL = '[Education] Fetch Fail';

export const CREATE_START = '[Education] Create Start';
export const CREATE_SUCCESS = '[Education] Create Success';
export const CREATE_FAIL = '[Education] Create Fail';

export const UPDATE_START = '[Education] Update Start';
export const UPDATE_SUCCESS = '[Education] Update Success';
export const UPDATE_FAIL = '[Education] Update Fail';

export const DELETE_START = '[Education] Delete Start';
export const DELETE_SUCCESS = '[Education] Delete Success';
export const DELETE_FAIL = '[Education] Delete Fail';

export const CREATE_DOC_START = '[Education] Create Doc Start';
export const CREATE_DOC_SUCCESS = '[Education] Create Doc Success';
export const CREATE_DOC_FAIL = '[Education] Create Doc Fail';

export const UPDATE_DOC_START = '[Education] Update Doc Start';
export const UPDATE_DOC_SUCCESS = '[Education] Update Doc Success';
export const UPDATE_DOC_FAIL = '[Education] Update Doc Fail';

export const DELETE_DOC_START = '[Education] Delete Doc Start';
export const DELETE_DOC_SUCCESS = '[Education] Delete Doc Success';
export const DELETE_DOC_FAIL = '[Education] Delete Doc Fail';

export const CLEAR_ERRORS = '[Education] Clear Errors';
export const CLEAR_STATUS = '[Education] Clear Status';
export const CLEAR_CREATE = '[Education] Clear Create';


///////////

export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Education[]) { }
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
        specialization_EN: string,
        establishment_EN: string,
        mention_EN: string,
        country_EN: string,
        city_EN: string,
        yearsCount: number,
        note: string,
        startDate: Date,
        graduateDate: Date,
        city_FR?: string,
        country_FR?: string,
        mention_FR?: string,
        establishment_FR?: string,
        specialization_FR?: string,
        title_FR?: string,
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Education) { }
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
        specialization_EN: string,
        establishment_EN: string,
        mention_EN: string,
        country_EN: string,
        city_EN: string,
        yearsCount: number,
        note: string,
        startDate: Date,
        graduateDate: Date,
        city_FR?: string,
        country_FR?: string,
        mention_FR?: string,
        establishment_FR?: string,
        specialization_FR?: string,
        title_FR?: string,
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Education) { }
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
        educationId: number,
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

    constructor(public payload: { deletedDocumentId: number, educationId: number }) { }
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

export type EducationActions =
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