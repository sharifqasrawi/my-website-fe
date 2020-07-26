import { Action } from '@ngrx/store';

import { User } from './../../../models/user.model';

export const FETCH_START = '[Users] Fetch Start';
export const FETCH_SUCCESS = '[Users] Fetch Success';
export const FETCH_FAIL = '[Users] Fetch Fail';

export const FETCH_USER_START = '[Users] Fetch User Start';
export const FETCH_USER_SUCCESS = '[Users] Fetch User Success';
export const FETCH_USER_FAIL = '[Users] Fetch User Fail';


export const SEARCH_START = '[Users] Search Start';
export const SEARCH_SUCCESS = '[Users] Search Success';
export const SEARCH_FAIL = '[Users] Search Fail';

export const CREATE_START = '[Users] Create Start';
export const CREATE_SUCCESS = '[Users] Create Success';
export const CREATE_FAIL = '[Users] Create Fail';

export const UPDATE_START = '[Users] Update Start';
export const UPDATE_SUCCESS = '[Users] Update Success';
export const UPDATE_FAIL = '[Users] Update Fail';

export const UPDATE_PROFILE_START = '[Users] Update Profile Start';
export const UPDATE_PROFILE_SUCCESS = '[Users] Update Profile Success';
export const UPDATE_PROFILE_FAIL = '[Users] Update Profile Fail';

export const CHANGE_PASSWORD_START = '[Users] Change Password Start';
export const CHANGE_PASSWORD_SUCCESS = '[Users] Change Password Success';
export const CHANGE_PASSWORD_FAIL = '[Users] Change Password Fail';

export const DELETE_START = '[Users] Delete Start';
export const DELETE_SUCCESS = '[Users] Delete Success';
export const DELETE_FAIL = '[Users] Delete Fail';

export const SET_ACTIVE_DEACTIVE_START = '[Users] Set Active Deactive Start';
export const SET_ACTIVE_DEACTIVE_SUCCESS = '[Users] Set Active Deactive Success';
export const SET_ACTIVE_DEACTIVE_FAIL = '[Users] Set Active Deactive Fail';

export const CLEAR_ERRORS = '[Users] Clear Errors';
export const CLEAR_STATUS = '[Users] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: User[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}



export class FetchUserStart implements Action {
    readonly type = FETCH_USER_START;
}

export class FetchUserSuccess implements Action {
    readonly type = FETCH_USER_SUCCESS;

    constructor(public payload: User) { }
}

export class FetchUserFail implements Action {
    readonly type = FETCH_USER_FAIL;

    constructor(public payload: string[]) { }
}



export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        email: string,
        password: string,
        confirmPassword: string,
        firstName: string,
        lastName: string,
        isAdmin: boolean,
        emailConfirmed: boolean
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: User) { }

}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}


export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        emailConfirmed: boolean
        isAdmin: boolean,
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: User) { }

}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}


export class UpdateProfileStart implements Action {
    readonly type = UPDATE_PROFILE_START;

    constructor(public payload: {
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
    }) { }
}

export class UpdateProfileSuccess implements Action {
    readonly type = UPDATE_PROFILE_SUCCESS;

    constructor(public payload: User) { }

}

export class UpdateProfileFail implements Action {
    readonly type = UPDATE_PROFILE_FAIL;

    constructor(public payload: string[]) { }
}


export class ChangePasswordStart implements Action {
    readonly type = CHANGE_PASSWORD_START;

    constructor(public payload: { userId: string, password: string }) { }
}

export class ChangePasswordSuccess implements Action {
    readonly type = CHANGE_PASSWORD_SUCCESS;

    constructor(public payload: boolean) { }

}

export class ChangePasswordFail implements Action {
    readonly type = CHANGE_PASSWORD_FAIL;

    constructor(public payload: string[]) { }
}


export class SearchStart implements Action {
    readonly type = SEARCH_START;

    constructor(public payload: string) { }
}

export class SearchSuccess implements Action {
    readonly type = SEARCH_SUCCESS;

    constructor(public payload: User[]) { }
}

export class SearchFail implements Action {
    readonly type = SEARCH_FAIL;

    constructor(public payload: string[]) { }
}

export class DeleteStart implements Action {
    readonly type = DELETE_START;

    constructor(public payload: string) { }
}

export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload: string) { }
}

export class DeleteFail implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: string[]) { }
}


export class SetActiveDeactiveStart implements Action {
    readonly type = SET_ACTIVE_DEACTIVE_START;

    constructor(public payload: { userId: string, option: string }) { }
}

export class SetActiveDeactiveSuccess implements Action {
    readonly type = SET_ACTIVE_DEACTIVE_SUCCESS;

    constructor(public payload: { userId: string, isActive: boolean }) { }
}

export class SetActiveDeactiveFail implements Action {
    readonly type = SET_ACTIVE_DEACTIVE_FAIL;

    constructor(public payload: string[]) { }
}


export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


export type UsersActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | FetchUserStart
    | FetchUserSuccess
    | FetchUserFail
    | CreateStart
    | CreateSuccess
    | CreateFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | UpdateProfileStart
    | UpdateProfileSuccess
    | UpdateProfileFail
    | ChangePasswordStart
    | ChangePasswordSuccess
    | ChangePasswordFail
    | ClearErrors
    | ClearStatus
    | SearchStart
    | SearchSuccess
    | SearchFail
    | SetActiveDeactiveStart
    | SetActiveDeactiveSuccess
    | SetActiveDeactiveFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    ;