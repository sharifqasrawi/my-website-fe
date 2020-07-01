import { ContactInfo } from './../../../../models/contactInfo.model';

import * as ContactInfoActions from './contactInfo.actions';
export interface State {
    contactInfo: ContactInfo;
    loading: boolean,
    loaded: boolean,
    saving: boolean,
    saved: boolean,
    errors: string[],
}

const initialState: State = {
    contactInfo: null,
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    errors: null
};


export function ContactInfoReducer(state: State = initialState, action: ContactInfoActions.ContactInfoActions) {
    switch (action.type) {
        case ContactInfoActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case ContactInfoActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                contactInfo: { ...action.payload }
            };
        case ContactInfoActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        ///////////

        case ContactInfoActions.UPDATE_START:
            return {
                ...state,
                saving: true,
                saved: false,
                errors: null
            };
        case ContactInfoActions.UPDATE_SUCCESS:
            return {
                ...state,
                saving: false,
                saved: true,
                contactInfo: { ...action.payload }
            };
        case ContactInfoActions.UPDATE_FAIL:
            return {
                ...state,
                saving: false,
                errors: [...action.payload]
            };

        ///////////

        case ContactInfoActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };


        case ContactInfoActions.CLEAR_STATUS:
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