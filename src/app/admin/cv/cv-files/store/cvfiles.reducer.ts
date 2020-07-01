
import * as CVFilesActions from './cvfiles.actions';
import { CVFile } from './../../../../models/cvFile.model';


export interface State {
    cvFiles: CVFile[],
    loading: boolean,
    loaded: boolean,
    creating: boolean,
    created: boolean,
    updating: boolean,
    updated: boolean,
    deleting: boolean,
    deleted: boolean,
    errors: string[],
}

const initialState: State = {
    cvFiles: [],
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    errors: null
};


export function cvFilesReducer(state: State = initialState, action: CVFilesActions.CVFilesActions) {
    switch (action.type) {
        case CVFilesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            };
        case CVFilesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                cvFiles: [...action.payload],
            };
        case CVFilesActions.FETCH_FAIL:
            return {
                ...state,
                loading: true,
                errors: [...action.payload],
            };

        ///////////////////

        case CVFilesActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null,
            };
        case CVFilesActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                cvFiles: [...state.cvFiles, action.payload],
            };
        case CVFilesActions.CREATE_FAIL:
            return {
                ...state,
                creating: true,
                errors: [...action.payload],
            };

        ///////////////////

        case CVFilesActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null,
            };
        case CVFilesActions.UPDATE_SUCCESS:
            const cvToUpdateIndex = state.cvFiles.findIndex(c => c.id === action.payload.id);
            const cvToUpdate = state.cvFiles.find(c => c.id === action.payload.id);
            const cvFilesAfterUpdate = [...state.cvFiles];

            const cvFileAfterUpdate: CVFile = {
                ...cvToUpdate,
                fileName: action.payload.fileName,
                filePath: action.payload.filePath,
                language: action.payload.language,
                lastUpdateDate: action.payload.lastUpdateDate,
            };

            cvFilesAfterUpdate[cvToUpdateIndex] = cvFileAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                cvFiles: [...cvFilesAfterUpdate],
            };
        case CVFilesActions.UPDATE_FAIL:
            return {
                ...state,
                updating: true,
                errors: [...action.payload],
            };

        ///////////////////

        case CVFilesActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null,
            };
        case CVFilesActions.DELETE_SUCCESS:
            const cvToDeleteIndex = state.cvFiles.findIndex(c => c.id === action.payload);
            const cvFilesAfterDelete = [...state.cvFiles];

            cvFilesAfterDelete.splice(cvToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                cvFiles: [...cvFilesAfterDelete],
            };
        case CVFilesActions.DELETE_FAIL:
            return {
                ...state,
                deleting: true,
                errors: [...action.payload],
            };

        ///////////////////

        case CVFilesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };

        case CVFilesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                creating: false,
                created: false,
                updating: false,
                updated: false,
                deleting: false,
                deleted: false,
            };

        default:
            return state;
    }
}