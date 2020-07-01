import { Document } from './../../../../models/document.model';
import { Language } from './../../../../models/language.model';

import * as LanguagesActions from './languages.actions';

export interface State {
    languages: Language[],
    loading: boolean,
    loaded: boolean,
    creating: boolean,
    created: boolean,
    creatingDoc: boolean,
    createdDoc: boolean,
    updating: boolean,
    updated: boolean,
    updatingDoc: boolean,
    updatedDoc: boolean,
    deleting: boolean,
    deleted: boolean,
    deletingDoc: boolean,
    deletedDoc: boolean,
    errors: string[],
}

const initialState: State = {
    languages: [],
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    creatingDoc: false,
    createdDoc: false,
    updating: false,
    updated: false,
    updatingDoc: false,
    updatedDoc: false,
    deleting: false,
    deleted: false,
    deletingDoc: false,
    deletedDoc: false,
    errors: null,
};

export function languageReducer(state: State = initialState, action: LanguagesActions.LanguagesActions) {
    switch (action.type) {

        case LanguagesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case LanguagesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                languages: [...action.payload]
            };
        case LanguagesActions.FETCH_FAIL:
            return {
                ...state,
                loading: true,
                errors: [...action.payload]
            };


        ///////////

        case LanguagesActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case LanguagesActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                languages: [...state.languages, action.payload]
            };
        case LanguagesActions.CREATE_FAIL:
            return {
                ...state,
                creating: true,
                errors: [...action.payload]
            };

        ///////////

        case LanguagesActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case LanguagesActions.UPDATE_SUCCESS:
            const languageToUpdateIndex = state.languages.findIndex(e => e.id === action.payload.id);
            const languageToUpdate = state.languages.find(e => e.id === action.payload.id);
            const languagesAfterUpdate = [...state.languages];

            const languageAfterUpdate: Language = {
                ...languageToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
                levelRead: action.payload.levelRead,
                levelSpeak: action.payload.levelSpeak,
                levelWrite: action.payload.levelWrite,
            };

            languagesAfterUpdate[languageToUpdateIndex] = languageAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                languages: [...languagesAfterUpdate]
            };
        case LanguagesActions.UPDATE_FAIL:
            return {
                ...state,
                updating: true,
                errors: [...action.payload]
            };


        ///////////

        case LanguagesActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case LanguagesActions.DELETE_SUCCESS:
            const languageToDeleteIndex = state.languages.findIndex(e => e.id === action.payload);
            const languagesAfterDelete = [...state.languages];

            languagesAfterDelete.splice(languageToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                languages: [...languagesAfterDelete]
            };
        case LanguagesActions.DELETE_FAIL:
            return {
                ...state,
                deleting: true,
                errors: [...action.payload]
            };



        ///////////

        case LanguagesActions.CREATE_DOC_START:
            return {
                ...state,
                creatingDoc: true,
                createdDoc: false,
                errors: null
            };
        case LanguagesActions.CREATE_DOC_SUCCESS:
            const languageToAddDocIndex = state.languages.findIndex(e => e.id === action.payload.languageId);
            const languageToAddDoc = state.languages.find(e => e.id === action.payload.languageId);
            const languagesAfterAddDoc = [...state.languages];

            const languageAfterAddDoc: Language = {
                ...languageToAddDoc,
                documents: [...languageToAddDoc.documents, action.payload]
            };

            languagesAfterAddDoc[languageToAddDocIndex] = languageAfterAddDoc;

            return {
                ...state,
                creatingDoc: false,
                createdDoc: true,
                languages: [...languagesAfterAddDoc]
            };
        case LanguagesActions.CREATE_DOC_FAIL:
            return {
                ...state,
                creatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case LanguagesActions.UPDATE_DOC_START:
            return {
                ...state,
                updatingDoc: true,
                updatedDoc: false,
                errors: null
            };
        case LanguagesActions.UPDATE_DOC_SUCCESS:
            const languageToUpdateDocIndex = state.languages.findIndex(e => e.id === action.payload.languageId);
            const languageToUpdateDoc = state.languages.find(e => e.id === action.payload.languageId);
            const languagesAfterUpdateDoc = [...state.languages];
            const languageDocsAfterUpdate = [...languageToUpdateDoc.documents];
            const languageDocToUpdateIndex = languageDocsAfterUpdate.findIndex(d => d.id === action.payload.id);
            const languageDocToUpdate = languageDocsAfterUpdate.find(d => d.id === action.payload.id);

            const languageDocAfterUpdate: Document = {
                ...languageDocToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
                description_EN: action.payload.description_EN,
                description_FR: action.payload.description_FR,
                path: action.payload.path,
                fileId: action.payload.fileId,
                type: action.payload.type,
                isDisplayed: action.payload.isDisplayed
            };

            languageDocsAfterUpdate[languageDocToUpdateIndex] = languageDocAfterUpdate;

            const languageAfterUpdateDoc: Language = {
                ...languageToUpdateDoc,
                documents: [...languageDocsAfterUpdate]
            };

            languagesAfterUpdateDoc[languageToUpdateDocIndex] = languageAfterUpdateDoc;

            return {
                ...state,
                updatingDoc: false,
                updatedDoc: true,
                languages: [...languagesAfterUpdateDoc]
            };
        case LanguagesActions.UPDATE_DOC_FAIL:
            return {
                ...state,
                updatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case LanguagesActions.DELETE_DOC_START:
            return {
                ...state,
                deletingDoc: true,
                deletedDoc: false,
                errors: null
            };
        case LanguagesActions.DELETE_DOC_SUCCESS:
            const languageToDeleteDocIndex = state.languages.findIndex(e => e.id === action.payload.languageId);
            const languageToDeleteDoc = state.languages.find(e => e.id === action.payload.languageId);
            const languagesAfterDeleteDoc = [...state.languages];
            const languageDocsAfterDelete = [...languageToDeleteDoc.documents];
            const languageDocToDeleteIndex = languageDocsAfterDelete.findIndex(d => d.id === action.payload.deletedDocumentId);

            languageDocsAfterDelete.splice(languageDocToDeleteIndex, 1);


            const languageAfterDeleteDoc: Language = {
                ...languageToDeleteDoc,
                documents: [...languageDocsAfterDelete]
            };

            languagesAfterDeleteDoc[languageToDeleteDocIndex] = languageAfterDeleteDoc;

            return {
                ...state,
                deletingDoc: false,
                deletedDoc: true,
                languages: [...languagesAfterDeleteDoc]
            };
        case LanguagesActions.DELETE_DOC_FAIL:
            return {
                ...state,
                deletingDoc: false,
                errors: [...action.payload]
            };

        ///////////


        case LanguagesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case LanguagesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                creating: false,
                created: false,
                creatingDoc: false,
                createdDoc: false,
                updating: false,
                updated: false,
                updatingDoc: false,
                updatedDoc: false,
                deleting: false,
                deleted: false,
                deletingDoc: false,
                deletedDoc: false,
            };
        case LanguagesActions.CLEAR_CREATE:
            return {
                ...state,
                creating: false,
                created: false,
                creatingDoc: false,
                createdDoc: false,
                updating: false,
                updated: false,
                updatingDoc: false,
                updatedDoc: false,
            };

        default:
            return state;
    }
}
