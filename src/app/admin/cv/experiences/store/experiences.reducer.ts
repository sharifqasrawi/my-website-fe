import { Document } from './../../../../models/document.model';

import * as ExperiencesActions from './experiences.actions';
import { Experience } from '../../../../models/experience.model';

export interface State {
    experiences: Experience[],
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
    experiences: [],
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

export function educationReducer(state: State = initialState, action: ExperiencesActions.ExperiencesActions) {
    switch (action.type) {

        case ExperiencesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case ExperiencesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                experiences: [...action.payload]
            };
        case ExperiencesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        ///////////

        case ExperiencesActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case ExperiencesActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                experiences: [...state.experiences, action.payload]
            };
        case ExperiencesActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        ///////////

        case ExperiencesActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };
        case ExperiencesActions.UPDATE_SUCCESS:
            const experienceToUpdateIndex = state.experiences.findIndex(e => e.id === action.payload.id);
            const experienceToUpdate = state.experiences.find(e => e.id === action.payload.id);
            const experiencesAfterUpdate = [...state.experiences];

            const experienceAfterUpdate: Experience = {
                ...experienceToUpdate,
                title_EN: action.payload.title_EN,
                title_FR: action.payload.title_FR,
                accomplishments_EN: action.payload.accomplishments_EN,
                accomplishments_FR: action.payload.accomplishments_FR,
                responisbilites_EN: action.payload.responisbilites_EN,
                responisbilites_FR: action.payload.responisbilites_FR,
                country_EN: action.payload.country_EN,
                country_FR: action.payload.country_FR,
                city_EN: action.payload.city_EN,
                city_FR: action.payload.city_FR,
                company: action.payload.company,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                isCurrentlyWorking: action.payload.isCurrentlyWorking
            };

            experiencesAfterUpdate[experienceToUpdateIndex] = experienceAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                experiences: [...experiencesAfterUpdate]
            };
        case ExperiencesActions.UPDATE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };


        ///////////

        case ExperiencesActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case ExperiencesActions.DELETE_SUCCESS:
            const experienceToDeleteIndex = state.experiences.findIndex(e => e.id === action.payload);
            const experiencesAfterDelete = [...state.experiences];

            experiencesAfterDelete.splice(experienceToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                experiences: [...experiencesAfterDelete]
            };
        case ExperiencesActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };


        ///////////

        case ExperiencesActions.CREATE_DOC_START:
            return {
                ...state,
                creatingDoc: true,
                createdDoc: false,
                errors: null
            };
        case ExperiencesActions.CREATE_DOC_SUCCESS:
            const experienceToAddDocIndex = state.experiences.findIndex(e => e.id === action.payload.experienceId);
            const experienceToAddDoc = state.experiences.find(e => e.id === action.payload.experienceId);
            const experiencesAfterAddDoc = [...state.experiences];

            const experienceAfterAddDoc: Experience = {
                ...experienceToAddDoc,
                documents: [...experienceToAddDoc.documents, action.payload]
            };

            experiencesAfterAddDoc[experienceToAddDocIndex] = experienceAfterAddDoc;

            return {
                ...state,
                creatingDoc: false,
                createdDoc: true,
                experiences: [...experiencesAfterAddDoc]
            };
        case ExperiencesActions.CREATE_DOC_FAIL:
            return {
                ...state,
                creatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case ExperiencesActions.UPDATE_DOC_START:
            return {
                ...state,
                updatingDoc: true,
                updatedDoc: false,
                errors: null
            };
        case ExperiencesActions.UPDATE_DOC_SUCCESS:
            const experienceToUpdateDocIndex = state.experiences.findIndex(e => e.id === action.payload.experienceId);
            const experienceToUpdateDoc = state.experiences.find(e => e.id === action.payload.experienceId);
            const experiencesAfterUpdateDoc = [...state.experiences];
            const experienceDocsAfterUpdate = [...experienceToUpdateDoc.documents];
            const experienceDocToUpdateIndex = experienceDocsAfterUpdate.findIndex(d => d.id === action.payload.id);
            const experienceDocToUpdate = experienceDocsAfterUpdate.find(d => d.id === action.payload.id);

            const experienceDocAfterUpdate: Document = {
                ...experienceDocToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
                description_EN: action.payload.description_EN,
                description_FR: action.payload.description_FR,
                path: action.payload.path,
                fileId: action.payload.fileId,
                type: action.payload.type,
                isDisplayed: action.payload.isDisplayed
            };

            experienceDocsAfterUpdate[experienceDocToUpdateIndex] = experienceDocAfterUpdate;

            const experienceAfterUpdateDoc: Experience = {
                ...experienceToUpdateDoc,
                documents: [...experienceDocsAfterUpdate]
            };

            experiencesAfterUpdateDoc[experienceToUpdateDocIndex] = experienceAfterUpdateDoc;

            return {
                ...state,
                updatingDoc: false,
                updatedDoc: true,
                experiences: [...experiencesAfterUpdateDoc]
            };
        case ExperiencesActions.UPDATE_DOC_FAIL:
            return {
                ...state,
                updatingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case ExperiencesActions.DELETE_DOC_START:
            return {
                ...state,
                deletingDoc: true,
                deletedDoc: false,
                errors: null
            };
        case ExperiencesActions.DELETE_DOC_SUCCESS:
            const experienceToDeleteDocIndex = state.experiences.findIndex(e => e.id === action.payload.experienceId);
            const experienceToDeleteDoc = state.experiences.find(e => e.id === action.payload.experienceId);
            const experiencesAfterDeleteDoc = [...state.experiences];
            const experienceDocsAfterDelete = [...experienceToDeleteDoc.documents];
            const experienceDocToDeleteIndex = experienceDocsAfterDelete.findIndex(d => d.id === action.payload.deletedDocumentId);

            experienceDocsAfterDelete.splice(experienceDocToDeleteIndex, 1);


            const experienceAfterDeleteDoc: Experience = {
                ...experienceToDeleteDoc,
                documents: [...experienceDocsAfterDelete]
            };

            experiencesAfterDeleteDoc[experienceToDeleteDocIndex] = experienceAfterDeleteDoc;

            return {
                ...state,
                deletingDoc: false,
                deletedDoc: true,
                experiences: [...experiencesAfterDeleteDoc]
            };
        case ExperiencesActions.DELETE_DOC_FAIL:
            return {
                ...state,
                deletingDoc: false,
                errors: [...action.payload]
            };

        ///////////

        case ExperiencesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case ExperiencesActions.CLEAR_STATUS:
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

        case ExperiencesActions.CLEAR_CREATE:
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
