import { PersonalInfo } from './../../../../models/personalInfo.model';

import * as PersonalInfoActions from './personalInfo.actions';

export interface State {
    personalInfo: PersonalInfo;
    loading: boolean,
    loaded: boolean,
    saving: boolean,
    saved: boolean,
    errors: string[],
}

const initialState: State = {
    personalInfo: null,
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    errors: null
};


export function personalInfoReducer(state: State = initialState, action: PersonalInfoActions.PersonalInfoActions) {
    switch (action.type) {
        case PersonalInfoActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case PersonalInfoActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                personalInfo: { ...action.payload }
            };
        case PersonalInfoActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        ///////////

        case PersonalInfoActions.UPDATE_START:
            return {
                ...state,
                saving: true,
                saved: false,
                errors: null
            };
        case PersonalInfoActions.UPDATE_SUCCESS:
        
            return {
                ...state,
                saving: false,
                saved: true,
                personalInfo: { ...action.payload }
            };
        case PersonalInfoActions.UPDATE_FAIL:
            return {
                ...state,
                saving: false,
                errors: [...action.payload]
            };

        ///////////

        case PersonalInfoActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };


        case PersonalInfoActions.CLEAR_STATUS:
            return {
                ...state,
                saving: false,
                saved: false,
                loading: false,
                loaded: false,
            };

        default:
            return state;
    }
}