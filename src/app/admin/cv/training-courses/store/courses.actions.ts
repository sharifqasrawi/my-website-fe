
import { TrainingCourse } from './../../../../models/trainingCourse.model';
import { Document } from './../../../../models/document.model';
import { Action } from '@ngrx/store';


export const FETCH_START = '[Training Courses] Fetch Start';
export const FETCH_SUCCESS = '[Training Courses] Fetch Success';
export const FETCH_FAIL = '[Training Courses] Fetch Fail';

export const CREATE_START = '[Training Courses] Create Start';
export const CREATE_SUCCESS = '[Training Courses] Create Success';
export const CREATE_FAIL = '[Training Courses] Create Fail';

export const UPDATE_START = '[Training Courses] Update Start';
export const UPDATE_SUCCESS = '[Training Courses] Update Success';
export const UPDATE_FAIL = '[Training Courses] Update Fail';

export const DELETE_START = '[Training Courses] Delete Start';
export const DELETE_SUCCESS = '[Training Courses] Delete Success';
export const DELETE_FAIL = '[Training Courses] Delete Fail';

export const CREATE_DOC_START = '[Training Courses] Create Doc Start';
export const CREATE_DOC_SUCCESS = '[Training Courses] Create Doc Success';
export const CREATE_DOC_FAIL = '[Training Courses] Create Doc Fail';

export const UPDATE_DOC_START = '[Training Courses] Update Doc Start';
export const UPDATE_DOC_SUCCESS = '[Training Courses] Update Doc Success';
export const UPDATE_DOC_FAIL = '[Training Courses] Update Doc Fail';

export const DELETE_DOC_START = '[Training Courses] Delete Doc Start';
export const DELETE_DOC_SUCCESS = '[Training Courses] Delete Doc Success';
export const DELETE_DOC_FAIL = '[Training Courses] Delete Doc Fail';


export const CLEAR_ERRORS = '[Training Courses] Clear Errors';
export const CLEAR_STATUS = '[Training Courses] Clear Status';
export const CLEAR_CREATE = '[Training Courses] Clear Create';

///////////

export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload?: string) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: TrainingCourse[]) { }
}


export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

///////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        name: string,
        type: string,
        duration: string,
        establishment: string,
        dateTime: Date,
        courseUrl: string,
        country_EN: string,
        city_EN: string,
        country_FR?: string,
        city_FR?: string,
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: TrainingCourse) { }
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
        name: string,
        type: string,
        duration: string,
        establishment: string,
        dateTime: Date,
        courseUrl: string,
        country_EN: string,
        city_EN: string,
        country_FR?: string,
        city_FR?: string,
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: TrainingCourse) { }
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
        courseId: number,
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

    constructor(public payload: { deletedDocumentId: number, courseId: number }) { }
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

export type TrainingCoursesActions =
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