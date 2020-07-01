import { Action } from '@ngrx/store';

import { ContactInfo } from './../../../../models/contactInfo.model';

export const FETCH_START = '[Contact Info] Fetch Start';
export const FETCH_SUCCESS = '[Contact Info] Fetch Success';
export const FETCH_FAIL = '[Contact Info] Fetch Fail';

export const UPDATE_START = '[Contact Info] Update Start';
export const UPDATE_SUCCESS = '[Contact Info] Update Success';
export const UPDATE_FAIL = '[Contact Info] Update Fail';


export const CLEAR_ERRORS = '[Contact Info] Clear Errors';
export const CLEAR_STATUS = '[Contact Info] Clear Status';



export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: ContactInfo) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}


///////////


export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        emails: string,
        phone: string,
        country_EN: string,
        city_EN: string,
        zipCode: string,
        street: string,
        streetNumber: string,
        country_FR?: string,
        city_FR?: string,
        linkedInUrl?: string,
        gitHubUrl?: string,
        facebookUrl?: string,
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: ContactInfo) { }
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

export type ContactInfoActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | ClearErrors
    | ClearStatus
    ;