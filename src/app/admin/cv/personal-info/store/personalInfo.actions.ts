import { Action } from '@ngrx/store';

import { PersonalInfo } from './../../../../models/personalInfo.model';

export const FETCH_START = '[Personal Info] Fetch Start';
export const FETCH_SUCCESS = '[Personal Info] Fetch Success';
export const FETCH_FAIL = '[Personal Info] Fetch Fail';

export const UPDATE_START = '[Personal Info] Update Start';
export const UPDATE_SUCCESS = '[Personal Info] Update Success';
export const UPDATE_FAIL = '[Personal Info] Update Fail';


export const CLEAR_ERRORS = '[Personal Info] Clear Errors';
export const CLEAR_STATUS = '[Personal Info] Clear Status';



export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: PersonalInfo) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}


///////////


export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        name: string,
        title_EN: string,
        about_EN: string,
        imagePath: string,
        maritalStatus: string,
        title_FR?: string,
        about_FR?: string,
        driversLicense?: string,
        dateOfBirth?: Date
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: PersonalInfo) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

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

export type PersonalInfoActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | ClearErrors
    | ClearStatus
    ;