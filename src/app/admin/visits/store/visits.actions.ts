import { Visit } from './../../../models/visit.model';
import { Action } from "@ngrx/store";

export const FETCH_VISITS_CLIENT_START = '[App Settings] Fetch Visits Client Start';
export const FETCH_VISITS_CLIENT_SUCCESS = '[App Settings] Fetch Visits Client Success';
export const FETCH_VISITS_CLIENT_FAIL = '[App Settings] Fetch Visits Client Fail';

export const FETCH_VISITS_ADMIN_START = '[App Settings] Fetch Visits Admin Start';
export const FETCH_VISITS_ADMIN_SUCCESS = '[App Settings] Fetch Visits Admin Success';
export const FETCH_VISITS_ADMIN_FAIL = '[App Settings] Fetch Visits Admin Fail';

export const VISIT_START = '[App Settings] Visit Start';
export const VISIT_SUCCESS = '[App Settings] Visit Success';
export const VISIT_FAIL = '[App Settings] Visit Fail';


export const CLEAR_ERRORS = '[App Settings] Clear Errors';
export const CLEAR_STATUS = '[App Settings] Clear Status';



/////////////////////

export class VisitStart implements Action {
    readonly type = VISIT_START;

}

export class VisitSuccess implements Action {
    readonly type = VISIT_SUCCESS;

    constructor(public payload: number) { }
}

export class VisitFail implements Action {
    readonly type = VISIT_FAIL;

    constructor(public payload: string[]) { }
}


/////////////////////


export class FetchVisitsClientStart implements Action {
    readonly type = FETCH_VISITS_CLIENT_START;
}

export class FetchVisitsClientSuccess implements Action {
    readonly type = FETCH_VISITS_CLIENT_SUCCESS;

    constructor(public payload: number) { }
}

export class FetchVisitsClientFail implements Action {
    readonly type = FETCH_VISITS_CLIENT_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class FetchVisitsAdminStart implements Action {
    readonly type = FETCH_VISITS_ADMIN_START;
}

export class FetchVisitsAdminSuccess implements Action {
    readonly type = FETCH_VISITS_ADMIN_SUCCESS;

    constructor(public payload: Visit[]) { }
}

export class FetchVisitsAdminFail implements Action {
    readonly type = FETCH_VISITS_ADMIN_FAIL;

    constructor(public payload: string[]) { }
}



/////////////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

//////////

export type VisitsActions =
    | FetchVisitsClientStart
    | FetchVisitsClientSuccess
    | FetchVisitsClientFail
    | FetchVisitsAdminStart
    | FetchVisitsAdminSuccess
    | FetchVisitsAdminFail
    | VisitStart
    | VisitSuccess
    | VisitFail
    | ClearErrors
    | ClearStatus
    ;