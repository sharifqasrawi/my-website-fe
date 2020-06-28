import { Visit } from './../../../models/visit.model';

import * as VisitsActions from './visits.actions';

export interface State {

    loadingVisitsAdmin: boolean,
    totalVisits: number,
    loadingVisits: boolean,

    visits: Visit[],

    errorsVisits: string[],

}

const initialState: State = {

    visits: [],
    totalVisits: 0,
    loadingVisits: false,
    loadingVisitsAdmin: false,
    errorsVisits: null,


};

export function visitsReducer(state: State = initialState, action: VisitsActions.VisitsActions) {
    switch (action.type) {


        case VisitsActions.FETCH_VISITS_CLIENT_START:
            return {
                ...state,
                loadingVisits: true,
                errorsVisits: null
            };

        case VisitsActions.FETCH_VISITS_CLIENT_SUCCESS:
            return {
                ...state,
                loadingVisits: false,
                totalVisits: action.payload

            };
        case VisitsActions.FETCH_VISITS_CLIENT_FAIL:
            return {
                ...state,
                loadingVisits: false,
                errorsVisits: [...action.payload]
            };

        //////////////////

        case VisitsActions.FETCH_VISITS_ADMIN_START:
            return {
                ...state,
                loadingVisitsAdmin: true,
                errorsVisits: null
            };

        case VisitsActions.FETCH_VISITS_ADMIN_SUCCESS:
            return {
                ...state,
                loadingVisitsAdmin: false,
                visits: [...action.payload]

            };
        case VisitsActions.FETCH_VISITS_ADMIN_FAIL:
            return {
                ...state,
                loadingVisitsAdmin: false,
                errorsVisits: [...action.payload]
            };

        //////////////////

        case VisitsActions.VISIT_START:
            return {
                ...state,
                errorsVisits: null,
            };

        case VisitsActions.VISIT_SUCCESS:

            return {
                ...state,
                totalVisits: action.payload
            };
        case VisitsActions.VISIT_FAIL:
            return {
                ...state,
                errorsVisits: [...action.payload]
            };

        //////////////////


        case VisitsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                errorsVisits: null,
            };
        case VisitsActions.CLEAR_STATUS:
            return {
                ...state,
                loadingVisits: false,
                loadingVisitsAdmin: false,
            };
        default:
            return state;
    }
}