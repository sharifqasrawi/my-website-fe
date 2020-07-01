import { Education } from './../../../../models/education.model';
import { Document } from './../../../../models/document.model';

import * as EducationActions from './education.actions';

export interface State {
    educations: Education[],
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
    educations: [],
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

export function educationReducer(state: State = initialState, action: EducationActions.EducationActions) {
    switch (action.type) {

        case EducationActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case EducationActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                educations: [...action.payload]
            };
        case EducationActions.FETCH_FAIL:
            return {
                ...state,
                loading: true,
                errors: [...action.payload]
            };


        ///////////

        case EducationActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case EducationActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                educations: [...state.educations, action.payload]
            };
        case EducationActions.CREATE_FAIL:
            return {
                ...state,
                creating: true,
                errors: [...action.payload]
            };

        ///////////

        case EducationActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case EducationActions.UPDATE_SUCCESS:
            const educationToUpdateIndex = state.educations.findIndex(e => e.id === action.payload.id);
            const educationToUpdate = state.educations.find(e => e.id === action.payload.id);
            const educationsAfterUpdate = [...state.educations];

            const educationAfterUpdate: Education = {
                ...educationToUpdate,
                title_EN: action.payload.title_EN,
                title_FR: action.payload.title_FR,
                establishment_EN: action.payload.establishment_EN,
                establishment_FR: action.payload.establishment_FR,
                mention_EN: action.payload.mention_EN,
                mention_FR: action.payload.mention_FR,
                country_EN: action.payload.country_EN,
                country_FR: action.payload.country_FR,
                city_EN: action.payload.city_EN,
                city_FR: action.payload.city_FR,
                specialization_EN: action.payload.specialization_EN,
                specialization_FR: action.payload.specialization_FR,
                yearsCount: action.payload.yearsCount,
                note: action.payload.note,
                startDate: action.payload.startDate,
                graduateDate: action.payload.graduateDate,
            };

            educationsAfterUpdate[educationToUpdateIndex] = educationAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                educations: [...educationsAfterUpdate]
            };
        case EducationActions.UPDATE_FAIL:
            return {
                ...state,
                updating: true,
                errors: [...action.payload]
            };


        ///////////

        case EducationActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case EducationActions.DELETE_SUCCESS:
            const educationToDeleteIndex = state.educations.findIndex(e => e.id === action.payload);
            const educationsAfterDelete = [...state.educations];

            educationsAfterDelete.splice(educationToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                educations: [...educationsAfterDelete]
            };
        case EducationActions.DELETE_FAIL:
            return {
                ...state,
                deleting: true,
                errors: [...action.payload]
            };

        ///////////

        case EducationActions.CREATE_DOC_START:
            return {
                ...state,
                creatingDoc: true,
                createdDoc: false,
                errors: null
            };
        case EducationActions.CREATE_DOC_SUCCESS:
            const educationToAddDocIndex = state.educations.findIndex(e => e.id === action.payload.educationId);
            const educationToAddDoc = state.educations.find(e => e.id === action.payload.educationId);
            const educationsAfterAddDoc = [...state.educations];

            const educationAfterAddDoc: Education = {
                ...educationToAddDoc,
                documents: [...educationToAddDoc.documents, action.payload]
            };

            educationsAfterAddDoc[educationToAddDocIndex] = educationAfterAddDoc;

            return {
                ...state,
                creatingDoc: false,
                createdDoc: true,
                educations: [...educationsAfterAddDoc]
            };
        case EducationActions.CREATE_DOC_FAIL:
            return {
                ...state,
                creatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case EducationActions.UPDATE_DOC_START:
            return {
                ...state,
                updatingDoc: true,
                updatedDoc: false,
                errors: null
            };
        case EducationActions.UPDATE_DOC_SUCCESS:
            const educationToUpdateDocIndex = state.educations.findIndex(e => e.id === action.payload.educationId);
            const educationToUpdateDoc = state.educations.find(e => e.id === action.payload.educationId);
            const educationsAfterUpdateDoc = [...state.educations];
            const educationDocsAfterUpdate = [...educationToUpdateDoc.documents];
            const educationDocToUpdateIndex = educationDocsAfterUpdate.findIndex(d => d.id === action.payload.id);
            const educationDocToUpdate = educationDocsAfterUpdate.find(d => d.id === action.payload.id);

            const educationDocAfterUpdate: Document = {
                ...educationDocToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
                description_EN: action.payload.description_EN,
                description_FR: action.payload.description_FR,
                path: action.payload.path,
                fileId: action.payload.fileId,
                type: action.payload.type,
                isDisplayed: action.payload.isDisplayed
            };

            educationDocsAfterUpdate[educationDocToUpdateIndex] = educationDocAfterUpdate;

            const educationAfterUpdateDoc: Education = {
                ...educationToUpdateDoc,
                documents: [...educationDocsAfterUpdate]
            };

            educationsAfterUpdateDoc[educationToUpdateDocIndex] = educationAfterUpdateDoc;

            return {
                ...state,
                updatingDoc: false,
                updatedDoc: true,
                educations: [...educationsAfterUpdateDoc]
            };
        case EducationActions.UPDATE_DOC_FAIL:
            return {
                ...state,
                updatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case EducationActions.DELETE_DOC_START:
            return {
                ...state,
                deletingDoc: true,
                deletedDoc: false,
                errors: null
            };
        case EducationActions.DELETE_DOC_SUCCESS:
            const educationToDeleteDocIndex = state.educations.findIndex(e => e.id === action.payload.educationId);
            const educationToDeleteDoc = state.educations.find(e => e.id === action.payload.educationId);
            const educationsAfterDeleteDoc = [...state.educations];
            const educationDocsAfterDelete = [...educationToDeleteDoc.documents];
            const educationDocToDeleteIndex = educationDocsAfterDelete.findIndex(d => d.id === action.payload.deletedDocumentId);

            educationDocsAfterDelete.splice(educationDocToDeleteIndex, 1);


            const educationAfterDeleteDoc: Education = {
                ...educationToDeleteDoc,
                documents: [...educationDocsAfterDelete]
            };

            educationsAfterDeleteDoc[educationToDeleteDocIndex] = educationAfterDeleteDoc;

            return {
                ...state,
                deletingDoc: false,
                deletedDoc: true,
                educations: [...educationsAfterDeleteDoc]
            };
        case EducationActions.DELETE_DOC_FAIL:
            return {
                ...state,
                deletingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case EducationActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case EducationActions.CLEAR_STATUS:
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

        case EducationActions.CLEAR_CREATE:
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
